import { Button, Center, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import login_BG from '../Assets/login_BG.png'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const onChange = (e)=>{
        setEmail(e.target.value)
    }
    return (
        <Flex height='100vh' bgImage={login_BG} backgroundRepeat='no-repeat' backgroundSize='cover' backgroundPosition='right' backgroundColor='#eef0ff' p='55px 25px' w='100%' justifyContent={{ lg: 'center', md: 'center', sm: 'center', base: 'center' }} alignItems='center'>
            <Flex flexDirection='column' w='40%' padding='30px' boxShadow='0px 0px 5px 0px #00000063, 0px 0px 10px 0px #00000063' bgColor='#ffffff' borderRadius={15} alignItems='center' h='400px'>
                <Text color='#662671' fontWeight='600'>
                    Did you forget your password?
                </Text>
                <Text color='#717070'>Enter your email address and we'll send you a link to restore password</Text>
                <FormControl my={{ lg: 10, md: 8, sm: 5, base: 5 }} w='300px'>
                    <FormLabel>Email Address</FormLabel>
                    <Input type='email' name='email' value={email} onChange={onChange} w='100%' placeholder='Email' required />
                </FormControl>
                <Button bgColor='#5C218B' color='white' w='300px' fontWeight='400'>Request reset link</Button>
                <Center my={5} color='#979595' fontSize='14'><Link to='/login' color='#979595'>Back to log in</Link></Center>
            </Flex>
        </Flex>
    )
}

export default ForgotPassword