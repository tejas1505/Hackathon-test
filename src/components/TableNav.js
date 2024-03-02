import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React from 'react'
import { RxDashboard } from 'react-icons/rx'
import { Search2Icon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const TableNav = () => {
    const navigate = useNavigate();
    return (
        <Flex width='100%' justifyContent='space-between' height='50px' alignItems='center'>
            <Flex gap={5} alignItems='center'>
                <RxDashboard fontSize='30' />
                <Text fontSize='22px'>Category</Text>
            </Flex>
            <Box w='60%'>
                <InputGroup w='100%'>
                    <InputLeftElement pointerEvents='none'>
                        <Search2Icon color='gray.300' />
                    </InputLeftElement>
                    <Input type='text'  border='1px solid #ccc'/>
                </InputGroup>
            </Box>
            <Box>
                <Button bgColor='#662671' color='white' _hover={{ backgroundColor: '#66267196' }} borderRadius='10px' onClick={()=>navigate('/category/addcategory')}>
                Add New
                </Button>
            </Box>
        </Flex>
    )
}

export default TableNav