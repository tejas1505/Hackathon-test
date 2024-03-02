import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import home_icon from '../Assets/home_icon.png'
import product_icon from '../Assets/product_icon.png'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <VStack
            spacing={4}
            align='stretch'
            bgColor='#F4F4F4'
            w='340px'
            p='2px'
            display={{lg:'flex', md:'none', sm:'none', base:'none'}}
        >
            <Flex mt={4} as='button' h='45px' bg={location.pathname === '/' ? '#FFF8B7' : 'transparent'} alignItems='center' p='0px 20px' justifyContent='space-between' _hover={{backgroundColor:'#FFF8B7'}} onClick={()=>navigate('/')}>

                <Flex gap={5}>
                    <Image src={home_icon} />
                    <Text fontSize='22px'> Home</Text>
                </Flex>
                <Box transform='rotate(90deg)'>
                    <TriangleUpIcon fontSize='20' color='#A3A3A3' />
                </Box>
            </Flex>
            <Flex mt={4} as='button' h='45px' bg={location.pathname === '/category' || location.pathname === '/category/addcategory' ? '#FFF8B7' : 'transparent'} alignItems='center' p='0px 20px' justifyContent='space-between' _hover={{backgroundColor:'#FFF8B7'}} onClick={()=>navigate('/category')}>
                <Flex gap={5}>
                    <RxDashboard fontSize='30'/>
                    <Text fontSize='22px'>Category</Text>
                </Flex>
                <Box transform='rotate(90deg)'>
                    <TriangleUpIcon fontSize='20' color='#A3A3A3' />
                </Box>
            </Flex>
            <Flex mt={4} as='button' h='45px' bg={location.pathname === '/products' || location.pathname === '/product/addproduct' ? '#FFF8B7' : 'transparent'} alignItems='center' p='0px 20px' justifyContent='space-between' _hover={{backgroundColor:'#FFF8B7'}} onClick={()=>navigate('/products')}>

                <Flex gap={5}>
                    <Image src={product_icon} />
                    <Text fontSize='22px'> Products</Text>
                </Flex>
                <Box transform='rotate(90deg)'>
                    <TriangleUpIcon fontSize='20' color='#A3A3A3' />
                </Box>
            </Flex>
        </VStack>
    )
}

export default Sidebar