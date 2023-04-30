import Slider from "../UI/Slider";
import NavBar from "../UI/NavBar";
import Products from "../UI/Products";
import Newsletter from "../UI/Newsletter";
import ProductPg from "./ProductPg";
import Cart from "./Cart";

const HomePage = () => {
    return (<>
        <NavBar />
        <Slider />
        <Products />
        <Newsletter />

        {/* <ProductPg />
        <Cart/> */}
        
    </>)
}
export default HomePage;