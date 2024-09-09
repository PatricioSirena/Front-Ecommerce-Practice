import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import { clientAxios, configHeaders } from '../helpers/axios';


const CardC = ({idPage, productId, galery, name, price, description, getFavoriteFunction, setIsloadingHook}) => {
    const [mainImage, setMainImage] = useState('')

    const getMainImage = () =>{
        galery.forEach((element) =>{
            if(element.mainPicture === true){
                setMainImage(element.url)
            }
        })
    }

    const handleClickDeleteFromFav = async (idProduct) =>{
        const result = confirm('Desea eliminar este producto de favoritos?')
        if(result){
            const response = await clientAxios.post(`/products/deleteFromFav/${idProduct}`, {}, configHeaders)
            alert(response.data.msg)
        }
        setIsloadingHook(true)
        getFavoriteFunction()
    } 

    useEffect(() =>{
        getMainImage()
    })

    return (
        <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={`${mainImage}`} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Text>
                    {price}
                </Card.Text>
                <Link to={`/productPage/${productId}`} className={idPage === 'home' ? 'btn btn-dark w-50' : 'btn btn-dark w-25 mx-2'}>Ver</Link>
                {
                    idPage === 'favorite' &&
                <Button onClick={() => handleClickDeleteFromFav(productId)} className='btn btn-danger mx-2'>Eliminar</Button>
                }
            </Card.Body>
        </Card>
        )
}

export default CardC