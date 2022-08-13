import React, {useState, useContext} from 'react';
import { Avatar } from "@mui/material";
import "./DashboardMenuItem.css";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/AuthContext';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useSnackbar } from "notistack";
import apiServices from '../../../services/apiServices';


  
function DashboardMenuItem({ id, image, name, ingredient, price }) {

  const { enqueueSnackbar } = useSnackbar();
  const {setCart, auth } = useContext(AuthContext);
  const access_Token = auth.access_Token;
  const [openCart, setOpenCart] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);


  const handleClickOpen = () => {
    setOpenCart(true);
  };

  const handleClickOpenFeedback = () => {
    setOpenFeedback(true);
  };

  const handleClose = (value) => {
    setOpenCart(false);
    console.log('food', value);
    if(value.msg === 'add'){
      addToCart(value.data);
    }
  };

  const handleCloseFeedback = (value) => {
    setOpenFeedback(false);
    console.log('feedback', value);
    if (value.msg === 'submit'){
      handleSubmitFeedback(value.data);
    }
  
  };

  const addToCart = (selectedCartValue) => {
  
    console.log(selectedCartValue);

    setCart(prev => {
      console.log('prev', prev)
      const isItemInCart = prev.find((item) => item.foodId === selectedCartValue.foodId);
      console.log(isItemInCart)
      
      if (isItemInCart) {
        return prev.map((item) =>
          item.foodId === selectedCartValue.foodId
            ? { ...item, cost: item.cost + selectedCartValue.cost, totalNumber: item.totalNumber + selectedCartValue.totalNumber }
            : item
        );
      }
      enqueueSnackbar(selectedCartValue.name +' Added to Cart!', { variant: "success" });
      return [...prev,selectedCartValue ];
    } 
    );
  
  };
  function createFeedbackData(foodId, comment, stars) {
    const foodID = Number(foodId);
    const star = Number(stars);
  return {"foodId": foodID, "stars": star, "comment":comment};
}

  const handleSubmitFeedback = async (feedback) => {

    const data = createFeedbackData(feedback.foodId, feedback.comment, feedback.stars)
  if (data.comment.length > 0){
    console.log(data)
    try {
      const response = await apiServices({
        method: "post",
        url: "/user/feedback/create",
        data: data,
        headers: {'Authorization': 'Bearer ' + access_Token},
      }
      );
      console.log('res____', response)
      enqueueSnackbar('Feedback Submitted for '+ feedback.name + '!', { variant: "success" })
   
  } catch (err) {
       if (err.response?.status === 403) {
        console.log(err)
          const errorMessage = err.response.data.detail;
         enqueueSnackbar(errorMessage, { variant: "error" });
      }
      else if (err.response?.status === 404){
        const infoMessage = err.response?.data.detail;
        enqueueSnackbar(infoMessage, { variant: "info" });
      }
    
  }
      }
      else {
        enqueueSnackbar('You cannot Submit Empty Comment!', { variant: "info" });
      }
    };

  return (
    <div className="dashboardMenuItem">
      
      <div>
        <Avatar
          alt="Remy Sharp"
          src={image}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      </div>

      <h2 className="name"> {name} </h2>
      <h5 className="ingredient">{ingredient} </h5>
      <h5> GHC {price}. 00 </h5>
      
      <Box>
        
        <Button
          variant="contained"
          style={{ marginRight: "10px" }}
          size="small"
          color="secondary"
          margin="10px"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleClickOpen}
        >
          Add To Cart
        </Button>
       
        <CartDialog
        selectedCartValue={{
          msg:'',
          data:{
            foodId: id, 
            name: name, 
            ingredient:ingredient, 
            image:image, 
            totalNumber: null, 
            price: price, cost: null }
          }}
        open={openCart}
        onClose={handleClose}
      />


        <Button
          variant="contained"
          size="small"
          color="success"
          endIcon={<FeedbackIcon />}
          onClick={handleClickOpenFeedback}
        >
          Give FeedBack
        </Button>

        <FeedbackDialog
        selectedFeedbackValue={{ 
          msg:'', 
          data: {
            foodId: id, 
            name: name, 
            ingredient:ingredient, 
            image:image, 
            stars: null,
            comment: '' }
          }}
        open={openFeedback}
        onCloseFeedback={handleCloseFeedback}
      />
      </Box>
    </div>
  );
}

function CartDialog(props) {
  const { onClose, selectedCartValue, open } = props;

  const handleClose = (text) => {
    selectedCartValue.msg = text;
    onClose(selectedCartValue);

  };
  const [itemCount, setItemCount] = useState(1);
  selectedCartValue.data.totalNumber = itemCount
  selectedCartValue.data.cost = selectedCartValue.data.totalNumber * selectedCartValue.data.price
  return (
    <Dialog open={open} onClose={() => handleClose('cancel')}
    PaperProps={{ sx: { 
    position: "absolute", 
    top: 10, 
    right: 10, 
    m: 0, 
    width: 340, 
    height: '80%',
     borderRadius: 10,
   backgroundColor: '#00302E',
   color: '#FBDDBB'} }}>
        <DialogTitle>Add to Cart</DialogTitle>
        <DialogContent>
          <div className="feedbackDialog">
      
        <div>
        <Avatar
          alt="Remy Sharp"
          src={selectedCartValue.data.image}
          style={{ width: 200, height: 200, marginTop: 12 }}
        />
      </div>
      <h2 className="name"> {selectedCartValue.data.name} </h2>
      <h5 className="ingredient">{selectedCartValue.data.ingredient} </h5>
      <h5> GHC {selectedCartValue.data.price}. 00 </h5>
      </div>
          <ButtonGroup>
          <Button
          style={{ marginRight: "10px", color: '#00302E', backgroundColor: '#FBDDBB' }}
          size="small"
           variant="contained"
            onClick={() => {
              setItemCount(Math.max(itemCount - 1, 0));
            }}
          >
            {" "}
            
            <RemoveIcon fontSize="small" />
          </Button>

           <h2> {itemCount} </h2> 

          <Button
           style={{ marginLeft: "10px", color: '#00302E', backgroundColor: '#FBDDBB'}}
           size="small"
           variant="contained"
            onClick={() => {
              setItemCount(itemCount + 1);
            }}
          >
            {" "}
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        </DialogContent>
        <DialogActions 
         style={{margin: 0, paddingBottom: 50 , paddingRight: 30}}>
          <Button
           variant="contained"
           size="small"
           color="primary"
            onClick={() => handleClose('cancel')}
            >Cancel
            </Button>
          <Button
           variant="contained"
           size="small"
           color="secondary"
            onClick={() => handleClose('add')}
            >Add to Cart List
            </Button>
        </DialogActions>
      </Dialog>
  
  );
}

CartDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedCartValue: PropTypes.object.isRequired,
};


function FeedbackDialog(props) {
  const { onCloseFeedback, selectedFeedbackValue, open } = props;
  const [comment, setComment] = useState("");

  const labels = {
    
    1: 'Tasteless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };

  function getLabelText(rate) {
    return `${rate} Star${rate !== 1 ? 's' : ''}, ${labels[rate]}`;
  }
  
  const [rate, setRate] = useState(2);
  const [hover, setHover] = useState(-1)

  const handleCloseFeedback = (msg) => {
   selectedFeedbackValue.msg=msg
    onCloseFeedback(selectedFeedbackValue);
  };
  selectedFeedbackValue.data.comment = comment;
  selectedFeedbackValue.data.stars = rate;
  return (
    <Dialog open={open}
     onClose={() => handleCloseFeedback('cancel')}
     PaperProps={{ sx: { position: "absolute", 
     top: 10, 
     right: 10, 
     m: 0, 
     width: 340, 
     height: '100%',
      borderRadius: 10,
    backgroundColor: '#00302E',
    color: '#FBDDBB'} }}
     >
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <div className="feedbackDialog">
      
        <div>
        <Avatar
          alt="Remy Sharp"
          src={selectedFeedbackValue.data.image}
          style={{ width: 200, height: 200, marginTop: 12 }}
        />
      </div>
      <h2> {selectedFeedbackValue.data.name} </h2>
      <h5>{selectedFeedbackValue.data.ingredient} </h5>
      </div>
      <TextareaAutosize
            autoFocus
            aria-label="minimum height"
            minRows={3}
            style={{ width: 300, height: 150 }}
            margin="dense"
            id="comment"
            placeholder="Give Us a Feedback"
            type="text"
            variant="standard"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value); }
            }
          />
      <Box
      sx={{
        width: 100,
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        paddingTop: 5
      }}
    >
      <Rating
        name="hover-feedback"
        value={rate}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setRate(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55, color: '#FFFF' }} fontSize="inherit" />}
      />
      {rate !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rate]}</Box>
      )}
      </Box>

        </DialogContent>
        <DialogActions 
         style={{margin: 0, paddingBottom: 50 , paddingRight: 30}}>
          <Button 
           variant="contained"
           size="small"
           color="primary"
            onClick={() => handleCloseFeedback('cancel')}
            >Cancel
            </Button>
          <Button 
           variant="contained"
          size="small"
          color="success"
           onClick={() => handleCloseFeedback('submit')}
           >Submit
           </Button>
        </DialogActions>
      </Dialog>
  
  );
}

FeedbackDialog.propTypes = {
  onCloseFeedback: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedFeedbackValue: PropTypes.object.isRequired,
};

export default DashboardMenuItem;
