import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import ProductContext from '../context/ProductContext'

const AddCategory = ({showAlert}) => {
    const navigate = useNavigate()

    const [creds, setCreds] = useState({
        name: "",
        description: "",
        status: ""
    })

    const categories = useContext(ProductContext);

    const { addCategory, fetchCategory } = categories

    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const message = await addCategory(creds.name, creds.description, creds.status);
        showAlert(message.message, message.type)
        setLoading(false)
        await fetchCategory()
        setCreds({
            name: "",
            description: "",
            status: ""
        })
    }
    return (
        <Box h='100vh'>
            <Box>
                <Navbar />
            </Box>
            <Flex h='88%'>
                <Flex>
                    <Sidebar />
                </Flex>
                <Box w='100%' p={3}>
                    <Box boxShadow='0px 4px 10px 0px #00000040' borderRadius='10px' p={2} height='100%' position='relative'>
                        <Flex my={2} alignItems='center' gap={4}>
                            <ArrowBackIcon color='#807964' fontSize='26' onClick={() => navigate('/category')} />
                            <Text fontWeight='600' fontSize='24'>Add Category</Text>
                        </Flex>
                        <form onSubmit={handleSubmit}>
                            <Flex w='100%' gap={4} p={4}>
                                <Input placeholder='Category Name' w='100%' onChange={onChange} name='name' value={creds.name} required />
                                <Input placeholder='Description' w='100%' onChange={onChange} name='description' value={creds.description} required />
                                <Select name='status' placeholder='' w='100%' onChange={onChange} value={creds.status} required>
                                    <option value='option1' hidden defaultValue>Status</option>
                                    <option value='Active'>Active</option>
                                    <option value='Inactive'>Inactive</option>
                                </Select>
                            </Flex>
                            <Flex position='absolute' bottom='10px' right='10px'>
                                <Button mx={2} height='40px' p='0px 50px' fontSize='12' borderRadius='35px' background='transparent' border='1px solid #ccc' _hover={{ background: 'transparent' }} type='reset' onClick={() => navigate('/category')}>Cancel</Button>
                                <Button mx={2} height='40px' p='0px 50px' type='submit' bgColor='#5C218B' color='white' _hover={{ backgroundColor: '#5C218B88' }} borderRadius='35px' fontSize='12' isLoading={loading}>Save</Button>
                            </Flex>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </Box>

    )
}

export default AddCategory