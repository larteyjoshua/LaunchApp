import React, {useState, useEffect} from "react";
import MenuItem from "../sharedComponents/menItem/MenuItem";
import "./Home.css";
import AvatarImage from "../../assets/images/about.jpg";
import { Avatar } from "@mui/material";
import IphoneLogo from "../../assets/images/iphone.png";
import AndroidLogo from "../../assets/images/android.png";

import apiServices from '../../services/apiServices';

function Home() {

  const [foods, setFoods] = useState([]);
  
    useEffect(() => {
      apiServices.get('/user/food/').then((response) => {
           setFoods(response.data);
           console.log(response)
        }).catch(function (error) {
          // handle error
          console.log(error);
        });
     }, []);
  
  

  return (
   
    <div className="menu">
      <div className="topSide">
        <div className="leftItem">
          <h1>Book your Lunch with easy... </h1>
          <h4>book your your tomorrow lunch today and enjoy better food</h4>
          <img className="playStore" src={AndroidLogo} alt="Logo" />
          <img className="playStore" src={IphoneLogo} alt="Logo" />
        </div>

        <div className="rightItem">
          <Avatar
            alt="food"
            src={AvatarImage}
            style={{ width: 200, height: 200 }}
          />{" "}
        </div>
      </div>
      <div className="list">
        <h1 className="menuTitle">Special Meals of the day!</h1>
        <p>
          {" "}
          Check our specials menu of the day and get discounts on all our meals
          and swift delivery to what ever location within.
        </p>
        <div className="menuList">
          {foods.map((food, key) => {
            return (
              <MenuItem
                key={key}
                image={food.imagePath}
                name={food.name}
                ingredient={food.ingredients}
              />
            );
          })}
        </div>
      </div>

      <div className="notify">
        <h2>Get notified when we update!</h2>
        <p>LaunchApp will automatic send notification</p>
        <p>when new Foods are added when you signup...</p>
      </div>
    </div>
  );
}

export default Home;
