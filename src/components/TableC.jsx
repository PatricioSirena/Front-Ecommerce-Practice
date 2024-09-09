import { Button, Container, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { clientAxios, configHeaders } from "../helpers/axios";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react"

const TableC = ({ idPage, array, getUsersFunction, getProductFunction, getCartFunction, setIsloadingHook }) => {
    const [show, setShow] = useState(false);
    const [productToChange, setProductToChange] = useState({});


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClickUserStatus = async (userId, userStatus) => {
        let message;
        if (userStatus) {
            message = 'Quiere inhabilitar a este usuario?'
        } else {
            message = 'Quiere habilitar a este usuario?'
        }
        const result = confirm(message)
        if (result) {
            const result = await clientAxios.post(`/users/changeState/${userId}`, {}, configHeaders)
            alert(result.data);
        }
        setIsloadingHook(true)
        getUsersFunction()
    }

    const handleClickDeleteUser = async (userId) => {
        const result = confirm('Quiere eliminar a este usuario?')
        if (result) {
            const response = await clientAxios.delete(`/users/${userId}`, configHeaders)
            alert(response.data.msg);
        }
        setIsloadingHook(true)
        getUsersFunction()
    }

    const handleClickEditProductButton = async (product) => {
        setProductToChange(product)
        handleShow()
    }

    const handleChangeProductInfo = (ev) =>{
        setProductToChange({...productToChange, [ev.target.name] : ev.target.value})
    }

    const handleClickEditProduct = async (productId) =>{
        const response = await clientAxios.put(`/products/${productId}`, productToChange, configHeaders)
        alert(response.data);
        setIsloadingHook(true)
        getProductFunction()
        handleClose()
    }

    const handleClickProductStatus = async (productId, productStatus) => {
        let message;
        if (productStatus) {
            message = 'Desea inhabilitar este producto?'
        } else {
            message = 'Desea habilitar este producto?'
        }
        const response = confirm(message)
        if (response) {
            const result = await clientAxios.post(`/products/productState/${productId}`, {}, configHeaders)
            alert(result.data);
        }
        setIsloadingHook(true)
        getProductFunction()
    }

    const handleClickDeleteProduct = async (productId) => {
        const result = confirm('Desea eliminar este producto?')
        if (result) {
            const response = await clientAxios.delete(`/products/${productId}`, configHeaders)
            alert(response.data)
        }
        setIsloadingHook(true)
        getProductFunction()
    }

    const handleClickDeleteProductCart = async (productId) => {
        const result = confirm('Desea eliminar este producto del carrito?')
        if (result) {
            const response = await clientAxios.post(`/products/deleteFromCart/${productId}`, {}, configHeaders)
            alert(response.data.msg)
        }
        setIsloadingHook(true)
        getCartFunction()
    }

    return (
        <Container className='mt-5'>
            <Table striped bordered hover>
                <thead>
                    {
                        idPage === 'adminUsers' ?
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                            : idPage === 'adminProducts' ?
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                                : idPage === 'userCart' &&
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                    }
                </thead>
                <tbody>
                    {
                        idPage === 'adminUsers' ?
                            array.map(user =>
                                <tr key={user._id}>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className='d-flex justify-content-around'>
                                        <Button onClick={() => handleClickUserStatus(user._id, user.active)} variant={user.active ? 'warning' : 'primary'}>{user.active ? 'Inhabilitar' : 'Habilitar'}</Button>
                                        <Button onClick={() => handleClickDeleteUser(user._id)} variant='danger' disabled={user.role === 'admin' && true}>Eliminar</Button>
                                    </td>
                                </tr>
                            )
                            : idPage === 'adminProducts' ?
                                array.map(product =>
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.active ? 'Activo' : 'Inactivo'}</td>
                                        <td className='d-flex justify-content-around'>
                                            <Button onClick={() => handleClickEditProductButton(product)} variant='info'>Editar</Button>
                                            <Button onClick={() => handleClickProductStatus(product._id, product.active)} variant={product.active ? 'warning' : 'primary'}>{product.active ? 'Inhabilitar' : 'Habilitar'}</Button>
                                            <Button onClick={() => handleClickDeleteProduct(product._id)} variant='danger'>Eliminar</Button>
                                        </td>
                                    </tr>
                                )
                                : idPage === 'userCart' &&
                                array.map(item =>
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td className='d-flex justify-content-around'>
                                            <Link to={`/productPage/${item._id}`} className='btn btn-dark'>Ver</Link>
                                            <Button onClick={() => handleClickDeleteProductCart(item._id)} variant='danger'>Eliminar</Button>
                                        </td>
                                    </tr>
                                )
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Nombre" value={productToChange?.name} onChange={(ev) => handleChangeProductInfo(ev)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name='price' placeholder="Precio" value={productToChange.price} onChange={(ev) => handleChangeProductInfo(ev)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name='description' placeholder="Descripción" value={productToChange.description} onChange={(ev) => handleChangeProductInfo(ev)} />
                </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => handleClickEditProduct(productToChange._id)}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default TableC