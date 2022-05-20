import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import SiteWrapper from "../components/UI/SiteWrapper/SiteWrapper";
import ViewAllAdminUsers from "../components/Views/AdminUsers/viewAllAdminUsers";
import ViewAllBlogs from "../components/Views/Blogs/viewAllBlogs";
import ViewAllClassCategories from "../components/Views/ClassCategories/viewAllClassCategories";
import ViewAllClasses from "../components/Views/Classes/viewAllClasses";
import Login from "../components/Views/Login/login";
import ViewAllMeals from "../components/Views/Meal/viewAllMeals";
import ViewAllOrders from "../components/Views/Orders/viewAllOrders";
import ViewAllProducts from "../components/Views/Product/viewAllProducts";
import ViewAllUsers from "../components/Views/Users/viewAllUsers";
import ViewAllWorkOuts from "../components/Views/WorkOuts/viewAllWorkOuts";

const ApplicationRoutes = () => {
  return (
    <>
<BrowserRouter>
<Routes>
        <Route path="/" element={<Login />} />
    

  <Route element={<SiteWrapper />}>
  <Route path="/shop" element={<ViewAllProducts/>} />
<Route path="/workOuts" element={<ViewAllWorkOuts/>} />
<Route path="/meal" element={<ViewAllMeals/>} />
<Route path="/adminUsers" element={<ViewAllAdminUsers/>} />
<Route path="/users" element={<ViewAllUsers/>} />
<Route path="/classes" element={<ViewAllClasses/>} />
<Route path="/classesCategories" element={<ViewAllClassCategories/>} />
<Route path="/blogs" element={<ViewAllBlogs/>} />
<Route path="/orders" element={<ViewAllOrders/>} />
</Route>
</Routes>
</BrowserRouter>
  </>
  );
};

export default ApplicationRoutes;


