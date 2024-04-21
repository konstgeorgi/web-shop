import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.tsx";
import NotFound from "../pages/404/404.tsx";
import Product from "../pages/Product/Product.tsx";
import Cart from "../pages/Cart/Cart.tsx";
import NavBar from "../layout/NavBar.tsx";

const Router = () => (
  <BrowserRouter>
    <Routes>
        <Route element={<NavBar />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
            path="/product/:id"
            element={
                <Product />
            }
        />
        <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;