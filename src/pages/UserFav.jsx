import { useEffect, useState } from "react"
import CardC from "../components/CardC"
import { clientAxios, configHeaders } from '../helpers/axios'
import { Col, Container, Row } from "react-bootstrap"

const UserFav = () => {
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getFavorite = async () => {
    const response = await clientAxios.get('/products/getProductsFav', configHeaders)
    setFavorites(response.data.favorites);
    setIsLoading(false)
  }


  useEffect(() => {
    if (isLoading) {
      getFavorite()
    }
  }, [favorites])

  return (
    <>
      <Container className="m-5 text-center">
        <Row>
          {
            favorites.map((favorite) =>
              <Col className="mb-5" key={favorite._id} sm='12' md='6' lg='4'>
                <CardC idPage={'favorite'} productId={favorite._id} galery={favorite.galery} name={favorite.name} 
                price={favorite.price} description={favorite.description} getFavoriteFunction={getFavorite} 
                setIsloadingHook={setIsLoading} />
              </Col>
            )
          }
        </Row>
      </Container>
    </>
  )
}

export default UserFav