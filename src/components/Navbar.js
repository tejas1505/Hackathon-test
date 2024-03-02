import { Box, Button, Flex, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { CgProfile } from "react-icons/cg";
import Navbar_logo from '../Assets/Navbar_logo.png'
import { Link, useNavigate } from 'react-router-dom';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'

import caution_icon from '../Assets/caution_icon.png'

import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';

import home_icon from '../Assets/home_icon.png'
import product_icon from '../Assets/product_icon.png'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { RxDashboard } from "react-icons/rx";

const Navbar = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [navigate])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isDraw, onOpen: onDrawOpen, onClose: onDrawClose } = useDisclosure()

    return (
        <Stack flexDirection='row' justifyContent='space-between' height='87px' bgColor='#662671' alignItems='center' p='0px 30px'>
            <Box w='max-content' display='flex' gap={5} alignItems='center'>
                <HamburgerIcon onClick={onDrawOpen} display={{lg:'none', md:'flex', sm:'flex', base:'flex'}} color='white'/>
                <Link to='/'><Image height='auto' width={{ lg: '250px', md: '200px', sm: '150px', base: '150px' }} src={Navbar_logo} /></Link>
            </Box>
            <Box mx={5} w='max-content'>

                <Menu>
                    <MenuButton as='button' >
                        <CgProfile color='#FAF2ED' fontSize='40' />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => {
                            onOpen();
                        }}>Logout</MenuItem>
                    </MenuList>
                </Menu>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody p={7}>
                            <Flex justifyContent='center' alignItems='center'>
                                <Image height='auto' mx='5px' width='30px' src={caution_icon} />
                                <Text fontSize='26' fontWeight='700'>Log Out</Text>
                            </Flex>
                            <Flex justifyContent='center'>
                                <Text color='#686868' fontSize='20'>Are you sure you want to log out ?</Text>
                            </Flex>
                        </ModalBody>
                        <ModalFooter justifyContent='center' my={4}>
                            <Flex justifyContent='center'>
                                <Button mx={2} height='40px' p='0px 50px' fontSize='12' onClick={onClose} borderRadius='35px' background='transparent' border='1px solid #ccc' _hover={{ background: 'transparent' }}>Cancel</Button>
                                <Button mx={2} height='40px' p='0px 50px' onClick={() => {
                                    localStorage.clear();
                                    navigate('/login')
                                }} bgColor='#5C218B' color='white' _hover={{ backgroundColor: '#5C218B88' }} borderRadius='35px' fontSize='12'>Confirm</Button>
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Drawer
                    isOpen={isDraw}
                    placement='left'
                    onClose={onDrawClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody p={0}>
                            <VStack
                                spacing={4}
                                align='stretch'
                                bgColor='#F4F4F4'
                                w='340px'
                                p='2px'
                                mt={10}
                            >
                                <Flex mt={4} as='button' h='45px' alignItems='center' p='0px 20px' justifyContent='space-between' _hover={{ backgroundColor: '#FFF8B7' }} onClick={()=>{
                                    onDrawClose();
                                    navigate('/')
                                }}>

                                    <Flex gap={5}>
                                        <Image src={home_icon} />
                                        <Text fontSize='22px'> Home</Text>
                                    </Flex>
                                    <Box transform='rotate(90deg)'>
                                        <TriangleUpIcon fontSize='20' color='#A3A3A3' />
                                    </Box>
                                </Flex>
                                <Flex mt={4} as='button' h='45px' alignItems='center' p='0px 20px' justifyContent='space-between' _hover={{ backgroundColor: '#FFF8B7' }} onClick={()=>{
                                    onDrawClose();
                                    navigate('/category')
                                }}>
                                    <Flex gap={5}>
                                        <RxDashboard fontSize='30' />
                                        <Text fontSize='22px'>Category</Text>
                                    </Flex>
                                    <Box transform='rotate(90deg)'>
                                        <TriangleUpIcon fontSize='20' color='#A3A3A3' />
                                    </Box>
                                </Flex>
                                <Flex mt={4} as='button' h='45px' alignItems='center' p='0px 20px' justifyContent='space-between' _hover={{ backgroundColor: '#FFF8B7' }} onClick={()=>{
                                    onDrawClose();
                                    navigate('/products')
                                }}>

                                    <Flex gap={5}>
                                        <Image src={product_icon} />
                                        <Text fontSize='22px'> Products</Text>
                                    </Flex>
                                    <Box transform='rotate(90deg)'>
                                        <TriangleUpIcon fontSize='20' color='#A3A3A3' />
                                    </Box>
                                </Flex>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </Stack>
    )
}

export default Navbar