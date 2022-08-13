import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import MenuItem from "../sharedComponents/dashboardMenuItem/DashboardMenuItem";
import apiServices from "../../services/apiServices";


function Dashboard() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    apiServices
      .get("/user/food/")
      .then((response) => {
        setFoods(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="dashboardMenuList">
      {foods.map((food, key) => {
        return (
          <MenuItem
            key={key}
            id={food.id}
            image={food.imagePath}
            name={food.name}
            ingredient={food.ingredients}
            price={food.price}
          />
        );
      })}
    </div>
  );
}

export default Dashboard;
