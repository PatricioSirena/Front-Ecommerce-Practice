import { useEffect, useState } from "react";
import TableC from "../components/TableC"
import { clientAxios, configHeaders } from "../helpers/axios";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const getProducts = async () => {
        const result = await clientAxios.get('/products', configHeaders);
        setProducts(result.data);
        setIsLoading(false)
    }

    useEffect(()=>{
        if(isLoading){
            getProducts();
        }
    }, [products])

    return (
        <>
            <TableC idPage={'adminProducts'} array={products} getProductFunction={getProducts} setIsloadingHook={setIsLoading}/>
        </>
    )
}

export default AdminProducts