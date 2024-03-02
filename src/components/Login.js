import React, { useState } from 'react'
import login_BG from '../Assets/login_BG.png'
import Login_logo from '../Assets/Login_logo.png'
import { Button, Flex, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import {
    FormControl,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ showAlert }) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [creds, setCreds] = useState({
        email: "",
        password: ""
    })

    const [show, setShow] = useState(false)

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: creds.email, password: creds.password })
            });
            const json = await response.json();
            if (json.success) {
                showAlert("Login Successfully!", "success")
                setLoading(false)
                localStorage.setItem('token', json.authtoken)
                localStorage.setItem('email', json.email)
                navigate('/')
            } else {
                setLoading(false)
                showAlert("Invalid Credentials!", "danger")
            }
        } catch (error) {
            setLoading(false)
            showAlert("Internal server error", "danger")
        }
    }
    return (
        <Flex height='100vh' bgImage={login_BG} backgroundRepeat='no-repeat' backgroundSize='cover' backgroundPosition='right' backgroundColor='#eef0ff' p='55px 25px' w='100%' justifyContent={{lg:'flex-start', md:'center', sm:'center', base:'center'}}>
            <Flex flexDirection='column' w='400px' padding='30px' boxShadow='0px 0px 5px 0px #00000063, 0px 0px 10px 0px #00000063' bgColor='#ffffff' borderRadius={15} alignItems='center'>
                <Image src={Login_logo} height='auto' width='200px' />
                <Text fontSize={{lg:'20', md:'20', sm:'16', base:'16'}} color='#717070'>Welcome to Digitalflake Admin</Text>
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <FormControl my={{lg:10, md:8, sm:5, base:5}}>
                        <Input type='email' name='email' value={creds.email} onChange={onChange} w='100%' placeholder='Email' required />
                    </FormControl>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            name='password'
                            value={creds.password}
                            onChange={onChange}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' bg='none' _hover={{ background: 'none' }} size='sm' onClick={() => { setShow(!show) }}>
                                {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Flex justifyContent='flex-end' w='100%'>
                        <Link to='/forgot-password' color='#A08CB1'>Forgot Password?</Link>
                    </Flex>

                    <Button isLoading={loading} my={20} w='100%' type='submit' bgColor='#5C218B' color='white' _hover={{ backgroundColor: '#5C218B88' }}>
                        Login
                    </Button>
                </form>

            </Flex>
        </Flex>
    )
}

export default Login