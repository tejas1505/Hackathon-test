import { Box, Button, Center, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js';

const NewPassword = ({ showAlert }) => {

    const { link } = useParams();
    const navigate = useNavigate()

    const [creds, setCreds] = useState({
        password: "",
        cpassword: ""
    })

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    const decrypt = (encryptedData) => {
        const decodedEncryptedData = decodeURIComponent(encryptedData);
        const bytes = CryptoJS.AES.decrypt(decodedEncryptedData, 'hackathon');
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData
    }

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = decrypt(link)
        setLoading(true)

        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/auth/updatepass`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: creds.password })
        });
        const json = await response.json();
        if (json.success) {
            setLoading(false)
            showAlert(json.success, 'success')
            navigate('/login')
        } else {
            showAlert(json.error, 'danger')
            setLoading(false)
        }
    }

    return (
        <Flex h='100vh' w='100%' justifyContent='center' alignItems='center'>
            <Box p={5} border='1px solid #ccc' width='340px' height='300px'>
                <form onSubmit={handleSubmit}>
                    <Center flexDir='column'>
                        <Text fontSize='24'>New Password</Text>
                        <Text>{decrypt(link)}</Text>
                    </Center>
                    <Input my={4} placeholder='Password' onChange={onChange} name='password' value={creds.password} type='password'/>
                    <Input my={4} placeholder='Confirm Password' onChange={onChange} name='cpassword' value={creds.cpassword} type='password'/>
                    <Center>
                        <Button w='100%' backgroundColor='#5C218B' type='submit' color='white' isLoading={loading}>Submit</Button>
                    </Center>
                </form>
            </Box>
        </Flex>
    )
}

export default NewPassword