import React, { useState } from 'react'
import { createContext } from 'react';
import Routing from "../Common/routing"


const cartProductContext = createContext();

export default function ContextProvider() {

    const [cartProduct, setCartProduct] = useState([]);
   

    const cartProductObj = {
        cartProduct,
        setCartProduct
    }
    return (
        <div>
            <cartProductContext.Provider value={cartProductObj}>
                <Routing />
            </cartProductContext.Provider>
        </div>
    )
}

export {cartProductContext}
