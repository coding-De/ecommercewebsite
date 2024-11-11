import { useContext, useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {cartProductContext} from "../Common/ContextProvider"

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ProductOverview() {
    const [product,setProduct] = useState([]);
    const CartProductContext = useContext(cartProductContext);
    const { id } = useParams()
    const [isAddedProduct ,setIsAddedProduct]= useState("Add to Bag");


    useEffect(()=>{
       console.log(id)
        axios.get(`https://fakestoreapi.com/products/${id}`)
       .then(res=>setProduct(res.data))
       .catch(json=>console.log(json))
    },[])

    const AddProductToCart = () =>{
        let tmpArr = [];
        if(CartProductContext.cartProduct){
            tmpArr = CartProductContext.cartProduct.map((ele)=>ele.id)
        }
        if(!tmpArr.includes(product.id)){
        CartProductContext.setCartProduct([...CartProductContext.cartProduct,product])
        setIsAddedProduct("Added Succesfully");
        }else{
            setIsAddedProduct("Alredy Added");
        }
    }


    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                       {product.name&& <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.title}
                            </a>
                        </li>}
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
-                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            alt={product.image}
                            src={product.image}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            aria-hidden="true"
                                            className={classNames(
                                                product.rating && product.rating.rate > rating ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 shrink-0',
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {product.rating && product.rating.count} reviews
                                </a>
                            </div>
                        </div>

                      
                            <button
                                onClick={AddProductToCart}
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {isAddedProduct}
                            </button>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.category}</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductOverview
