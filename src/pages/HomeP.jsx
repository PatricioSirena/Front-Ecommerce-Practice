import { useState, useEffect } from "react"
import CardC from "../components/CardC"
import CarouselC from "../components/CarouselC"
import {clientAxios} from "../helpers/axios"
import { Col, Container, Row } from "react-bootstrap"

const HomeP = () => {
    const [products, setProducts] = useState([])

    const getProducts = async () =>{
        const data = await clientAxios.get('/products')
        const allProducts = data.data
        setProducts(allProducts)
    }
    
    useEffect(() =>{
        getProducts()
    }, [])

    return (
        <>
        <CarouselC/>
        <Container className="text-center">
            <Row>
        {
            products.map((product)=>
                <Col className="mb-5" key={product._id} sm='12' md='6' lg='4'>
                    <CardC idPage={'home'} productId={product._id} galery={product.galery} name={product.name} price={product.price} description={product.description}/>
                </Col>
            )
        }
            </Row>
        </Container>
        </>
    )
}

export default HomeP