import React, {useState, useEffect, useContext} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserAvatar from '../../assets/images/userAvatar.png'
import { Avatar } from '@mui/material';
import apiServices from "../../services/apiServices";
import AuthContext from '../../context/AuthContext';


function Profile() {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState({});

  const {auth } = useContext(AuthContext);
    const access_Token = auth.access_Token;

  const handleCompanyChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOrderChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const config = {
    headers:{
        'Authorization': 'Bearer ' + access_Token
    }
  };

  useEffect(() => {
    apiServices
    .get("/user/details",config)
    .then((response) => {
        console.log(response);
        setDetail(response.data);
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div>
   <CssBaseline />
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: '#00302E', height: 'auto', flexDirection: 'column'}} >
      <Card sx={{ maxWidth:"lg" , height: 300, marginTop: 5, marginBottom: 5, flexDirection: 'column'}}>
      <CardContent>
      <Typography  sx={{ float: 'right', marginTop: 10, marginRight: 30}} variant='h3'> 
      {detail.fullName} 
      <br></br>
      {detail.email}
      <p>Active: {String(detail.isActive)}</p>
      </Typography>
      <Avatar
          alt="User Avatar"
          src={UserAvatar}
          style={{ width: 200, height: 200, marginLeft: 30, marginTop: 12, float: 'left'}}
        />
       
      
      </CardContent>
    </Card>

    <Accordion expanded={expanded === 'panel3'} onChange={handleCompanyChange('panel3')}
    sx={{marginTop: 5, marginBottom: 5, }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography variant='h3' sx={{ width: '33%', flexShrink: 0 }}>Company Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h3'>
           Company Name: {detail.companyName}
            <br></br>
            Location:  {detail.location}
            <br></br>
            Active: {String(detail.companyIsActive)}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleOrderChange('panel4')}
          sx={{marginTop: 5, marginBottom: 5,  }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant='h3' sx={{ width: '33%', flexShrink: 0 }}>Order Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h3'>
           Total Order: {detail.totalOrder}
           <br></br>
           Total FeedBack: {detail.totalFeedback}
          </Typography>
        </AccordionDetails>
      </Accordion>
    
        </Box>
     
    </Container>

    </div>
 
    
  );
}

export default Profile;
