import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/AuthContext';
import './Cart.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { red,green } from '@mui/material/colors';
import apiServices from '../../services/apiServices';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';


function Cart() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {auth, cart , setCart} = useContext(AuthContext);
  const [price, setPrice] = useState(0);
  const access_Token = auth.access_Token;
  
  const handleRemove = (foodId) => {
    const food = cart.filter((item) => item.foodId === foodId);
    enqueueSnackbar(food[0].name + ' Removed', { variant: "info" });
    const arr = cart.filter((item) => item.foodId !== foodId);
    setCart(arr);
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.cost));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  const handleChange = (item, d) => {
      const ind = cart.indexOf(item);
      const arr = cart;
      arr[ind].totalNumber += d;
      if (arr[ind].totalNumber <= 0){
        arr[ind].totalNumber = 1;
      }
      arr[ind].cost = (arr[ind].totalNumber *  arr[ind].price);
      setCart([...arr]);

  };

  function createOrderData(foodId, totalNumber) {
      const foodID = Number(foodId);
      const totalNum = Number(totalNumber);
    return {"foodId": foodID, "totalNumber": totalNum};
  }


  const handleSubmitOrder = async (cart) => {

    const data = cart.map((item) => {
      return createOrderData(item.foodId, item.totalNumber)
    });

     if (data.length === 0) {
      enqueueSnackbar('Food Cart is Empty!', { variant: "warning" });
    }
     else if (data.length === 1 && data[0].totalNumber === 1){
    console.log(data)
    try {
      const response = await apiServices({
        method: "post",
        url: "/user/order/create",
        data: data,
        headers: {'Authorization': 'Bearer ' + access_Token},
      }
      );
      console.log('res____', response)
      const dataLength = response.data.length;
      enqueueSnackbar('Order Placed for ' + dataLength + ' foods', { variant: "success" })
      setCart([]);
      navigate('/container/dashboard');
   
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
      enqueueSnackbar('You are Entitled to One and Only One Food!', { variant: "warning" });
    }
    };

  return (
    <article>
    {cart.map((item) => (
      <div className="cart_box" key={item.foodId}>
        <div className="cart_img">
          <img src={item.image} alt="Food" />
          <h2>{item.name}</h2>
        </div>
        <h2>{item.price}</h2>
        <div>
        <ButtonGroup>
          <Button
          style={{ marginRight: "10px", color: '#00302E', backgroundColor: '#FBDDBB' }}
          size="small"
           variant="contained"
            onClick={() => {
              handleChange(item, - 1);
            }}
          >
            {" "}
            
            <RemoveIcon fontSize="small" />
          </Button>

           <h2> {item.totalNumber} </h2> 

          <Button
           style={{ marginLeft: "10px", color: '#00302E', backgroundColor: '#FBDDBB'}}
           size="small"
           variant="contained"
            onClick={() => {
              handleChange(item, 1);
            }}
          >
            {" "}
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        </div>
          <h2>{item.cost}</h2>
          <Button 
           size="small"
           variant="contained"
           style={{ marginRight: "10px", color:'#FFFF', backgroundColor: red[500] }}
           onClick={() =>  handleRemove(item.foodId)}>Remove</Button>
       
      </div>
    ))}
    <div className="total">
      <span>Total</span>
      <span>GHC {price} .00</span>
    </div>
    <section className= 'section' >
    <Button 
           size="large"
           variant="contained"
           style={{ marginRight: '10px', paddingButtom: '20px' ,color:'#FFFF', backgroundColor: green[500] }}
           onClick={() =>  handleSubmitOrder(cart)}>Checkout</Button>
</section>
  </article>


  );
}

export default Cart;
