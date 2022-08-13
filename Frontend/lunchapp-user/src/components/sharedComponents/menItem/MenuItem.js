import { Avatar } from "@mui/material";
import React from "react";
import './MenuItem.css'

function MenuItem({ image, name, ingredient }) {
  return (
    <div className="menuItem">
      <div><Avatar alt="food"
    src={image} style={{ width: 200, height: 200, marginTop: 34}} />
    </div>
      <h2 className="name"> {name} </h2>
      <h5 className="ingredient">{ingredient} </h5>
    </div>
  );
}

export default MenuItem;