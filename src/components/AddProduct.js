import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import ProductContext from '../context/ProductContext'

const AddProduct = ({ showAlert }) => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        fetchCategory();

    }, [])

    const navigate = useNavigate()

    const [creds, setCreds] = useState({
        name: "",
        pack_size: "",
        status: "",
        mrp: '',
        category: ''
    })

    const products = useContext(ProductContext);

    const { addProduct, fetchCategory, fetchProducts, categoriesData } = products

    const [loading, setLoading] = useState(false)
    const [label, setLabel] = useState('Product Image')
    const [Imgs, setImgs] = useState(null)
    const onUpload = (e) => {
        if (e.target.files[0]) {
            setLabel(e.target.files[0].name)
            setImgs(e.target.files[0])
        }
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const message = await addProduct(creds.name, creds.pack_size, creds.category, creds.mrp, creds.status, Imgs);
        showAlert(message.message, message.type)
        setLoading(false)
        await fetchProducts()
        setCreds({
            name: "",
            pack_size: "",
            status: "",
            mrp: '',
            category: ''
        })
        setImgs(null)
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
                            <ArrowBackIcon color='#807964' fontSize='26' onClick={() => navigate('/products')} />
                            <Text fontWeight='600' fontSize='24'>Add Category</Text>
                        </Flex>
                        <form onSubmit={handleSubmit}>
                            <Flex w='100%' gap={4} p={4} justifyContent='center'>
                                <Select name='category' placeholder='' w='320px' onChange={onChange} value={creds.category} required>
                                    <option hidden defaultValue>Category</option>
                                    {categoriesData.category && categoriesData.category.map((element, index) => {
                                        return <option value={element.name}>{element.name}</option>
                                    })}
                                </Select>
                                <Input placeholder='Product Name' w='320px' onChange={onChange} name='name' value={creds.name} required />
                                <Input placeholder='Pack Size' w='320px' onChange={onChange} name='pack_size' value={creds.pack_size} required />
                            </Flex>
                            <Flex w='100%' gap={4} p={4} justifyContent='center'>
                                <Input placeholder='MRP' w='320px' onChange={onChange} name='mrp' value={creds.mrp} required />
                                <FormControl w='320px'>
                                    <FormLabel border='1px solid #ccc' p='7px 5px' borderRadius={8} fontWeight='400' m={0}>{label}</FormLabel>
                                    <Input type='file' onChange={onUpload} display='none' />
                                </FormControl>
                                <Select name='status' placeholder='' w='320px' onChange={onChange} value={creds.status} required>
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

export default AddProduct