import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Select, Text, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import TableNav from './TableNav'
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

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const Category = ({ showAlert }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        fetchCategory()
        // eslint-disable-next-line

    }, [])

    const categories = useContext(ProductContext)
    const { fetchCategory, categoriesData, editCategory, deleteCategory } = categories

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isDelete, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const [creds, setCreds] = useState({
        name: "",
        description: "",
        status: ""
    })

    const [categoryId, setCategoryId] = useState('')
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }



    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true)
        const message = await editCategory(creds.name, creds.description, creds.status, categoryId);
        showAlert(message.message, message.type)
        setLoading(false)
        onClose()
        await fetchCategory()
    }

    const handleDelete = async (category_id)=>{
        const message = await deleteCategory(category_id)
        setLoading(true)
        showAlert(message.message, message.type)
        setLoading(false)
        await fetchCategory()
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
                        <TableNav />
                        <TableContainer overflow='auto' mt={5} maxW='100%'>
                            <Table>
                                <Thead bgColor='#FFF8B7'>
                                    <Tr mt={3}>
                                        <Th fontSize='16' p='15px' display='flex' alignItems='center'>ID <Box as='span' height='15px' width='15px' backgroundSize='contain' bgImage={table_arrows}></Box></Th>
                                        <Th fontSize='16' p='15px'>Name<Box as='span' height='15px' width='15px' backgroundSize='contain' bgImage={table_arrows}></Box></Th>
                                        <Th fontSize='16' p='15px' textAlign='cenetr'>Description<Box as='span' height='15px' width='15px' backgroundSize='contain' bgImage={table_arrows}></Box></Th>
                                        <Th fontSize='16' p='15px' textAlign='center'>Status<Box as='span' height='15px' width='15px' backgroundSize='contain' bgImage={table_arrows}></Box></Th>
                                        <Th fontSize='16' p='15px'></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {categoriesData.category ? categoriesData.category.map((element, index) => {
                                        return <>
                                            <Tr key={index}>
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
                                                    <Tooltip label={element.description}>
                                                        {element.description.slice(0, 30)}
                                                    </Tooltip>...
                                                </Td>
                                                <Td textAlign='center' color={element.status === 'Active' ? '#2DA323' : '#B13129'}>{element.status}</Td>
                                                <Td>
                                                    <EditIcon color='#00000056' fontSize='24' cursor='pointer' onClick={() => {
                                                        onOpen();
                                                        setCategoryId(element.id)
                                                    }} />
                                                    <DeleteIcon ml={4} color='#00000056' fontSize='24' cursor='pointer' onClick={()=>{
                                                        setCategoryId(element.id)
                                                        onDeleteOpen();
                                                    }} />
                                                </Td>
                                            </Tr>
                                        </>
                                    }):<Text>No categories here</Text>}
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
                    <ModalHeader>Edit Category</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={(e) => {
                        handleAddCategory(e)
                    }}>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input placeholder='Name' onChange={onChange} name='name' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder='Description' onChange={onChange} name='description' />
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
                                handleDelete(categoryId);
                                onDeleteClose();
                            }} bgColor='#5C218B' color='white' _hover={{ backgroundColor: '#5C218B88' }} borderRadius='35px' fontSize='12' isLoading={loading}>Confirm</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default Category