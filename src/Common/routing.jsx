import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../components/home"
import Cart from "../components/cart"
import Header from './Header'
import ProductOverview from '../components/ProductOverview'

function routing() {
    return (
        <BrowserRouter>
          <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/productoverview/:id" element={<ProductOverview />} />
            </Routes>
        </BrowserRouter>
    )
}

export default routing
