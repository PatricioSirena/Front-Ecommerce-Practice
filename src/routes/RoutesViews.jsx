import { Routes, Route } from 'react-router-dom'
import HomeP from '../pages/HomeP'
import LoginP from '../pages/LoginP'
import RegisterP from '../pages/RegisterP'
import ErrorP from '../pages/ErrorP'
import FooterC from '../components/FooterC'
import NavbarC from '../components/NavbarC'
import ProductP from '../pages/ProductP'
import AdminProducts from '../pages/AdminProducts'
import AdminUsers from '../pages/AdminUsers'
import UserCart from '../pages/UserCart'
import UserFav from '../pages/UserFav'

const RoutesViews = () => {
    return (
        <>
        <NavbarC/>
        <Routes>
            <Route path="/" element={<HomeP />} />
            <Route path="/login" element={<LoginP />} />
            <Route path="/register" element={<RegisterP />} />
            <Route path="/adminProducts" element={<AdminProducts />} />
            <Route path="/adminUsers" element={<AdminUsers />} />
            <Route path="/userCart" element={<UserCart />} />
            <Route path="/userFav" element={<UserFav />} />
            <Route path="/productPage/:productId" element={<ProductP />} />
            <Route path="*" element={<ErrorP />} />
        </Routes>
        <FooterC/>
        </>
    )
}

export default RoutesViews