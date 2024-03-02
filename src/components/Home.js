import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Login_logo from '../Assets/Login_logo.png'

const Home = () => {
  return (
    <Box h='100vh'>
      <Box>
        <Navbar />
      </Box>
      <Flex h='87%'>
        <Flex>
          <Sidebar />
        </Flex>
        <Flex width='100%' alignItems='center' justifyContent='center' height='70%'>
          <Flex flexDirection='column' alignItems='center'>
            <Image src={Login_logo} height='100px' width='auto' />
            <Text fontSize={{ lg: '20', md: '20', sm: '16', base: '16' }}>Welcome to Digitalflake Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Home