import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import SiteWrapper from "../components/UI/SiteWrapper/SiteWrapper";
import ViewAllAdminUsers from "../components/Views/AdminUsers/viewAllAdminUsers";
import ViewAllClassCategories from "../components/Views/ClassCategories/viewAllClassCategories";
import ViewAllClasses from "../components/Views/Classes/viewAllClasses";
import ViewAllMeals from "../components/Views/Meal/viewAllMeals";
import ViewAllProducts from "../components/Views/Product/viewAllProducts";
import ViewAllUsers from "../components/Views/Users/viewAllUsers";
import ViewAllWorkOuts from "../components/Views/WorkOuts/viewAllWorkOuts";

const ApplicationRoutes = () => {
//   const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <>

    <BrowserRouter>
    <SiteWrapper>
    <Routes>
      <Route path="/shop" element={<ViewAllProducts/>} />
      <Route path="/workOuts" element={<ViewAllWorkOuts/>} />
      <Route path="/meal" element={<ViewAllMeals/>} />
      <Route path="/adminUsers" element={<ViewAllAdminUsers/>} />
      <Route path="/users" element={<ViewAllUsers/>} />
      <Route path="/classes" element={<ViewAllClasses/>} />
      <Route path="/classesCategories" element={<ViewAllClassCategories/>} />

    </Routes>
    </SiteWrapper>
    </BrowserRouter>

  </>
  );
};

export default ApplicationRoutes;
