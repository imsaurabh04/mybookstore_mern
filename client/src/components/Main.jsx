import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Products from './Products'
import Login from './Login'
import Signup from './Signup'
import ProductDetail from './ProductDetail'
import Category from './admin/Category'
import Product from './admin/Product'
import UpsertProduct from './admin/UpsertProduct'
import CreateCategory from './admin/CreateCategory'
import CartDetail from './CartDetail'

const Main = () => {
  return (
    <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/content-management/categories" element={<Category />} />
        <Route path="/content-management/products" element={<Product />} />
        <Route path="/content-management/product/upsert/:id" element={<UpsertProduct />} />
        <Route path="/content-management/product/upsert" element={<UpsertProduct />} />
        <Route path="/content-management/category/create" element={<CreateCategory />} />

    </Routes>
)
}

export default Main