import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import SiteWrapper from "../components/UI/SiteWrapper/SiteWrapper";
import ViewAllMeals from "../components/Views/Meal/viewAllMeals";
import ViewAllProducts from "../components/Views/Product/viewAllProducts";

const ApplicationRoutes = () => {
//   const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <>

    <BrowserRouter>
    <SiteWrapper>
    <Routes>
      <Route path="/shop" element={<ViewAllProducts/>} />
      <Route path="/meal" element={<ViewAllMeals/>} />
    </Routes>
    </SiteWrapper>
    </BrowserRouter>

  </>
  );
};

export default ApplicationRoutes;
