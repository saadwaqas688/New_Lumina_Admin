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
import SingleClassDetails from "../components/Views/Classes/singleClassDetails";
import ViewAllClasses from "../components/Views/Classes/viewAllClasses";
import Login from "../components/Views/Login/login";
import ViewAllMealCategories from "../components/Views/Meal/MealCategories/viewAllMealCategories";
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
  <Route element={<SiteWrapper />}>
  <Route path="/shop" element={<ViewAllProducts/>} />
<Route path="/workOuts" element={<ViewAllWorkOuts/>} />
<Route path="/meal" element={<ViewAllMeals/>} />
<Route path="/mealCategories" element={<ViewAllMealCategories/>} />
<Route path="/adminUsers" element={<ViewAllAdminUsers/>} />
<Route path="/users" element={<ViewAllUsers/>} />
<Route path="/classes" element={<ViewAllClasses/>} />
<Route path="/classesCategories" element={<ViewAllClassCategories/>} />

<Route path="/classesCategories/:categoryId/:classId" element={<SingleClassDetails/>} />

<Route path="/blogs" element={<ViewAllBlogs/>} />
<Route path="/orders" element={<ViewAllOrders/>} />
</Route>
<Route path="/*" element={<Login />} />
</Routes>
</BrowserRouter>
  </>
  );
};

export default ApplicationRoutes;


