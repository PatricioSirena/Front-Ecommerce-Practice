import { useParams } from "react-router-dom"
import {clientAxios, configHeaders} from "../helpers/axios"
import { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"

const ProductP = () => {
    const [product, setProduct] = useState({})
    const [productImages, setProductImages] = useState([])
    const [userStatus, setUserStatus] = useState('')
    const params = useParams()

    const getProduct = async () =>{
        const response = await clientAxios.get(`/products/${params.productId}`)
        setProduct(response.data)
        setProductImages(response.data.galery)        
    }

    const getUserRole = () => {
        const userRole = JSON.parse(sessionStorage.getItem('role'))
        setUserStatus(userRole)
    }

    const handleAddCart = async () =>{
        const response = await clientAxios.post(`/products/addToCart/${product._id}`, {}, configHeaders).catch(error =>{
            if(error){
                alert(error.response.data.msg);
            }})
            if(response){
                alert(response.data.msg);
            }
    }
    
    const handleAddFav = async () =>{
        const response = await clientAxios.post(`/products/addToFav/${product._id}`, {}, configHeaders).catch(error =>{
            if(error){
                alert(error.response.data.msg);
            }})
            if(response){
                alert(response.data.msg);
            }
    }
    
    useEffect(()=>{        
        getProduct()
        getUserRole()
    }, [])

    return (
        <>
        <Container>
        <img src={`${productImages[0]?.url}`} alt="" />
        <p>{`${product?.name}`}</p>
        <p>{`${product?.description}`}</p>
        <p>{`${product?.price}`}</p>
        {   
            userStatus === 'user' &&
            <>
            <Button variant="dark" onClick={handleAddCart}>Agregar al carrito</Button>
            <Button variant="primary" onClick={handleAddFav}>Agregar a favoritos</Button>
            </>
        }
        </Container>
        </>
    )
}

export default ProductP