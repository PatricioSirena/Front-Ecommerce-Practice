import { useEffect, useState } from "react";
import TableC from "../components/TableC"
import { clientAxios, configHeaders } from "../helpers/axios";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const getUsers = async () =>{
        const result = await clientAxios.get('/users', configHeaders);
        setUsers(result.data);
        setIsLoading(false)
    }

    useEffect(()=>{
        if(isLoading){
            getUsers();
        }
    }, [users])

    return (
        <>
        <TableC idPage={'adminUsers'} array={users} getUsersFunction={getUsers} setIsloadingHook={setIsLoading} />
        </>
    )
}

export default AdminUsers