import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import ViewAllAdminUsers from "../Components/Views/AdminUsers/viewAllAdminUsers";
import SingleClass from "../Components/Views/Classes/singleClass";
import ViewAllClasses from "../Components/Views/Classes/viewAllClasses";
import ViewAllClassCategories from "../Components/Views/Classes/viewAllClassCategories";
import Login from "../Components/Views/Login/login";
import SingleMeal from "../Components/Views/Meal/singleMeal";
import ViewAllMeals from "../Components/Views/Meal/viewAllMeals";
import ViewAllOrders from "../Components/Views/Orders/viewAllOrders";
import SingleProduct from "../Components/Views/Product/singleProduct";
import ViewAllProducts from "../Components/Views/Product/viewAllProducts";
import SingleUser from "../Components/Views/Users/singleUser";
import ViewAllUsers from "../Components/Views/Users/viewAllUsers";
import SingleWorkOut from "../Components/Views/WorkOuts/singleWorkOut";
import ViewAllWorkOuts from "../Components/Views/WorkOuts/viewAllWorkOuts";
const ApplicationRoutes = () => {
//   const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/shop/:id" element={<SingleProduct />} />
      <Route path="/shop" element={<ViewAllProducts/>} />
      <Route path="/adminUsers" element={<ViewAllAdminUsers/>} />
      <Route path="/Users" element={<ViewAllUsers/>} />
      <Route path="/Users/:id" element={<SingleUser/>} />
      <Route path="/orders" element={<ViewAllOrders/>} />
      <Route path="/meal" element={<ViewAllMeals/>} />
      <Route path="/meal/:id" element={<SingleMeal/>} /> 
      <Route path="/Classes" element={<ViewAllClasses/>} />
      <Route path="/Classes/:id" element={<SingleClass/>} /> 
      <Route path="/workOuts" element={<ViewAllWorkOuts/>} />
      <Route path="/workOut/:id" element={<SingleWorkOut/>} /> 
      <Route path="/classesCategories" element={<ViewAllClassCategories/>} /> 




      <Route path="/" element={<Login/>} />

    </Routes>
    </BrowserRouter>
  </>
  );
};

export default ApplicationRoutes;
