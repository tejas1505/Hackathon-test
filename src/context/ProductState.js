import { useState } from "react";
import ProductContext from "./ProductContext";

const ProductState = ({ children }) => {

    const [categoriesData, setCategoriesData] = useState([])
    const [productData, setProductData] = useState([])

    const fetchCategory = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/category/getcategory`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        const json = await response.json();
        if (json.success) {
            setCategoriesData(json)
            return true
        } else {
            return false
        }
    }

    const editCategory = async (name, description, status, category_id) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/category/editcategory`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, description: description, status: status, category_id: category_id })
            })
            const json = await response.json();
            if (json.success) {
                return { type: 'success', message: json.success }
            } else {
                return { type: 'danger', message: json.error }
            }
        } catch (error) {
            return { type: 'danger', message: 'Internal server error' }
        }
    }

    const addCategory = async (name, description, status) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/category/addcategory`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, description: description, status: status })
            })
            const json = await response.json();
            if (json.success) {
                return { type: 'success', message: json.success }
            } else {
                return { type: 'danger', message: json.error }
            }
        } catch (error) {
            return { type: 'danger', message: 'Internal server error' }
        }
    }

    const deleteCategory = async (category_id) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/category/deletecategory`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category_id: category_id })
            })
            const json = await response.json();
            if (json.success) {
                return { type: 'success', message: json.success }
            } else {
                return { type: 'danger', message: json.error }
            }
        } catch (error) {
            return { type: 'danger', message: 'Internal server error' }
        }
    }

    //Products

    const fetchProducts = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/product/getproduct`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        const json = await response.json();
        if (json.success) {
            setProductData(json)
            return true
        } else {
            return false
        }
    }

    const editProduct = async (name, pack_size, status, product_id) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/product/editproduct`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, status: status, product_id: product_id, pack_size:pack_size })
            })
            const json = await response.json();
            if (json.success) {
                return { type: 'success', message: json.success }
            } else {
                return { type: 'danger', message: json.error }
            }
        } catch (error) {
            return { type: 'danger', message: 'Internal server error' }
        }
    }

    const addProduct = async (name, pack_size, category, mrp, status, image) => {
        try {
            const input_filename = Math.random().toString(36).substring(2, 10)
            const formData = new FormData();
            formData.append('name', name)
            formData.append('pack_size', pack_size)
            formData.append('category', category)
            formData.append('mrp', mrp)
            formData.append('status', status)
            formData.append('images', image, `${input_filename}.png`)
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/product/addproduct`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                body: formData
            })
            const json = await response.json();
            if (json.success) {
                return { type: 'success', message: json.success }
            } else {
                return { type: 'danger', message: json.error }
            }
        } catch (error) {
            return { type: 'danger', message: 'Internal server error' }
        }
    }

    const deleteProduct = async (product_id) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/product/deleteproduct`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ product_id: product_id })
            })
            const json = await response.json();
            if (json.success) {
                return { type: 'success', message: json.success }
            } else {
                return { type: 'danger', message: json.error }
            }
        } catch (error) {
            return { type: 'danger', message: 'Internal server error' }
        }
    }

    return (
        <ProductContext.Provider value={{ categoriesData, fetchCategory, editCategory, addCategory, deleteCategory, productData, fetchProducts, editProduct, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductState