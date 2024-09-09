import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {clientAxios} from '../helpers/axios';
import { useNavigate } from 'react-router-dom';


const FormC = ({ idPage }) => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handleChangeRegister = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleClickRegister = async (e) => {
        e.preventDefault()
        const { password, rpassword, firstName, lastName, email } = formData

        if (!password || !rpassword || !firstName || !lastName || !email) {
            alert('Debe completar todos los campos')
        }

        if (password === rpassword) {
            const result = await clientAxios.post('/users', {
                firstName, lastName, email, password
            })
            if (result.status === 201) {
                alert(result.data.msg)
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
        } else {
            alert('Las contraseñas deben coincidir')
        }
    }

    const handleClickLogin = async (e) => {
        e.preventDefault()
        const { password, email } = formData

        if (!password || !email) {
            alert('Debe completar todos los campos')
        }

        const result = await clientAxios.post('/users/login', {
            email, password
        })

        if (result.status === 200) {
            alert(result.data.msg)
            sessionStorage.setItem('token', JSON.stringify(result.data.token))
            sessionStorage.setItem('role', JSON.stringify(result.data.role))
            sessionStorage.setItem('userId', JSON.stringify(result.data.userId))
            setTimeout(() => {
                navigate('/')
            }, 1000);
        }
    }

    return (
        <Form>
            {
                idPage === 'register' &&
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name='firstName' placeholder="Nombre" onChange={handleChangeRegister} />
                </Form.Group>
            }
            {idPage === 'register' &&
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name='lastName' placeholder="Apellido" onChange={handleChangeRegister} />
                </Form.Group>
            }
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="Email" onChange={handleChangeRegister} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name='password' placeholder="Contraseña" onChange={handleChangeRegister} />
            </Form.Group>
            {
                idPage === 'register' &&
                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                    <Form.Label>Repetir Contraseña</Form.Label>
                    <Form.Control type="password" name='rpassword' placeholder="Repetir Contraseña" onChange={handleChangeRegister} />
                </Form.Group>
            }

            <Button variant="primary" type="submit" onClick={idPage === 'register' ? handleClickRegister : handleClickLogin}>
                {
                    idPage === 'register' ? 'Registrarse' : 'Iniciar Sesión'
                }
            </Button>
        </Form>)
}

export default FormC