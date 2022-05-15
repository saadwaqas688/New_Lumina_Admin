import SiteWrapper from "./components/UI/SiteWrapper/SiteWrapper";
import ViewAllMeals from "./components/Views/Meal/viewAllMeals";
import ViewAllProducts from "./components/Views/Product/viewAllProducts";

function App() {
  return (
    <SiteWrapper>
    {/* <ViewAllMeals/> */}
    <ViewAllProducts/>
    </SiteWrapper>

  );
}

export default App;
