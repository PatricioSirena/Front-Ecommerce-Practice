import { useEffect, useState } from "react"
import TableC from "../components/TableC"
import { clientAxios, configHeaders } from "../helpers/axios"

const UserCart = () => {
  const [cart, setCart] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getCart = async () =>{
    const result = await clientAxios.get('/products/getProductsCart', configHeaders)
    setCart(result.data.cart)
    setIsLoading(false)
  }

  useEffect(()=>{
    if(isLoading){
      getCart()
    }
  }, [cart])

  return (
    <>
      <TableC idPage={'userCart'} array={cart} getCartFunction={getCart} setIsloadingHook={setIsLoading} />
    </>
  )
}

export default UserCart