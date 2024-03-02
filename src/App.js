import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Home from './components/Home';
import { ChakraProvider } from '@chakra-ui/react'
import Category from './components/Category';
import ProductState from './context/ProductState';
import AddCategory from './components/AddCategory';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';

function App() {

  const showAlert = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message)
    }
  }

  return (
    <ChakraProvider>
      <ProductState>
        <Router>
          <Toaster />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/forgot-password" element={<ForgotPassword showAlert={showAlert} />} />
            <Route path="/new-password/:link" element={<NewPassword showAlert={showAlert} />} />
            <Route path="/category" element={<Category showAlert={showAlert} />} />
            <Route path="/products" element={<Products showAlert={showAlert} />} />
            <Route path="/category/addcategory" element={<AddCategory showAlert={showAlert} />} />
            <Route path="/products/addproduct" element={<AddProduct showAlert={showAlert} />} />
          </Routes>
        </Router>
      </ProductState>
    </ChakraProvider>
  );
}

export default App;
