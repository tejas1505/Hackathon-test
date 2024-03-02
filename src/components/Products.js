import { Box, Button, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputLeftElement, Select, Text, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

import table_arrows from '../Assets/table_arrows.png'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import ProductContext from '../context/ProductContext'
import { useNavigate } from 'react-router-dom'
import caution_icon from '../Assets/caution_icon.png'
import { Search2Icon } from '@chakra-ui/icons'
import product_icon from '../Assets/product_icon.png'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const Products = ({ showAlert }) => {
    const navigate = useNavigate();
    const products = useContext(ProductContext)
    const { fetchProducts, productData, editProduct, deleteProduct } = products
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        fetchProducts()
        // eslint-disable-next-line
    }, [])


    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isDelete, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const [creds, setCreds] = useState({
        name: "",
        description: "",
        status: ""
    })

    const [productId, setProductId] = useState('')
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }



    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true)
        const message = await editProduct(creds.name, creds.pack_size, creds.status, productId);
        showAlert(message.message, message.type)
        setLoading(false)
        onClose()
        await fetchProducts()
    }

    const handleDelete = async (product_id) => {
        const message = await deleteProduct(product_id)
        setLoading(true)
        showAlert(message.message, message.type)
        setLoading(false)
        await fetchProducts()
    }


    return (
        <Box h='100vh'>
            <Box>
                <Navbar />
            </Box>
            <Flex h='87%'>
                <Flex>
                    <Sidebar />
                </Flex>
                <Box w='100%' p={3}>
                    <Box boxShadow='0px 4px 10px 0px #00000040' borderRadius='10px' p={2} height='100%'>
                        <Flex width='100%' justifyContent='space-between' height='50px' alignItems='center'>
                            <Flex gap={5} alignItems='center'>
                                <Image src={product_icon} />
                                <Text fontSize='22px'>Product</Text>
                            </Flex>
                            <Box w='60%'>
                                <InputGroup w='100%'>
                                    <InputLeftElement pointerEvents='none'>
                                        <Search2Icon color='gray.300' />
                                    </InputLeftElement>
                                    <Input type='text' border='1px solid #ccc' />
                                </InputGroup>
                            </Box>
                            <Box>
                                <Button bgColor='#662671' color='white' _hover={{ backgroundColor: '#66267196' }} borderRadius='10px' onClick={() => navigate('/products/addproduct')}>
                                    Add New
                                </Button>
                            </Box>
                        </Flex>
                        <TableContainer overflow='auto' mt={5} maxW='100%'>
                            <Table>
                                <Thead bgColor='#FFF8B7'>
                                    <Tr mt={3}>
                                        <Th fontSize='16' p='15px' display='flex' alignItems='center'>ID <Box as='span' height='15px' width='15px' backgroundSize='contain' bgImage={table_arrows}></Box></Th>
                                        <Th fontSize='16' p='15px'>Name<Box as='span' height='15px' width='15px' backgroundSize='contain' bgImage={table_arrows}></Box></Th>
                                        <Th fontSize='16' p='15px' textAlign='cenetr'>Pack Size<Box as='span' height='15px' width='15px' backgroundSize='contain' bgImage={table_arrows}></Box></Th>
                                        <Th fontSize='16' p='15px' textAlign='center'>Category<Box as='span' height='15px' width='15px' backgroundSize='contain' bgImage={table_arrows}></Box></Th>
                                        <Th fontSize='16' p='15px' textAlign='center'>MRP</Th>
                                        <Th fontSize='16' p='15px' textAlign='center'>Image</Th>
                                        <Th fontSize='16' p='15px' textAlign='center'>Status</Th>
                                        <Th fontSize='16' p='15px'></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {productData.product ? productData.product.map((element, index) => {
                                        return <>
                                            <Tr key={index}>
                                                <Td p={3}></Td>
                                                <Td p={3}></Td>
                                                <Td p={3}></Td>
                                                <Td p={3}></Td>
                                                <Td p={3}></Td>
                                                <Td p={3}></Td>
                                                <Td p={3}></Td>
                                                <Td p={3}></Td>
                                            </Tr>
                                            <Tr my='3px !important' bgColor='#F2F2F2'>
                                                <Td>{element.id}</Td>
                                                <Td textAlign='left'>{element.name}</Td>
                                                <Td textAlign='center'>
                                                    {element.pack_size}
                                                </Td>
                                                <Td textAlign='center'>
                                                    {element.category}
                                                </Td>
                                                <Td textAlign='center'>
                                                    {element.mrp}
                                                </Td>
                                                <Td textAlign='center'>
                                                    <Flex justifyContent='center'>
                                                        <Image src={`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/images/${element.image}`} height='46px' width='46px' />
                                                    </Flex>
                                                </Td>
                                                <Td textAlign='center' color={element.status === 'Active' ? '#2DA323' : '#B13129'}>{element.status}</Td>
                                                <Td>
                                                    <EditIcon color='#00000056' fontSize='24' cursor='pointer' onClick={() => {
                                                        onOpen();
                                                        setProductId(element.id)
                                                    }} />
                                                    <DeleteIcon ml={4} color='#00000056' fontSize='24' cursor='pointer' onClick={() => {
                                                        setProductId(element.id)
                                                        onDeleteOpen();
                                                    }} />
                                                </Td>
                                            </Tr>
                                        </>
                                    }) : <Text>No products here</Text>}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Flex>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={(e) => {
                        handleAddProduct(e)
                    }}>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input placeholder='Name' onChange={onChange} name='name' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Pack Size</FormLabel>
                                <Input placeholder='Pack Size' onChange={onChange} name='Pack Size' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Status</FormLabel>
                                <Select onChange={onChange} name='status'>
                                    <option value='option1' hidden defaultValue>Select</option>
                                    <option value='Active'>Active</option>
                                    <option value='Inactive'>Inactive</option>
                                </Select>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit' isLoading={loading}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <Modal onClose={onDeleteClose} isOpen={isDelete} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody p={7}>
                        <Flex justifyContent='center' alignItems='center'>
                            <Image height='auto' mx='5px' width='30px' src={caution_icon} />
                            <Text fontSize='26' fontWeight='700'>Delete</Text>
                        </Flex>
                        <Flex justifyContent='center'>
                            <Text color='#686868' fontSize='20'>Are you sure you want to delete ?</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter justifyContent='center' my={4}>
                        <Flex justifyContent='center'>
                            <Button mx={2} height='40px' p='0px 50px' fontSize='12' onClick={onDeleteClose} borderRadius='35px' background='transparent' border='1px solid #ccc' _hover={{ background: 'transparent' }}>Cancel</Button>
                            <Button mx={2} height='40px' p='0px 50px' onClick={() => {
                                handleDelete(productId);
                                onDeleteClose();
                            }} bgColor='#5C218B' color='white' _hover={{ backgroundColor: '#5C218B88' }} borderRadius='35px' fontSize='12' isLoading={loading}>Confirm</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default Products