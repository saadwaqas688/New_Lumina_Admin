import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import SiteWrapper from "../components/UI/SiteWrapper/SiteWrapper";
import ViewAllAdminUsers from "../components/Views/AdminUsers/viewAllAdminUsers";
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

    </Routes>
    </SiteWrapper>
    </BrowserRouter>

  </>
  );
};

export default ApplicationRoutes;
