import { useContext, useEffect, useState } from 'react'
import { cartProductContext } from "../Common/ContextProvider"
import { Link } from 'react-router-dom';

// const products = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   // More products...
// ]


function Cart() {

  const [open, setOpen] = useState(true)
  const CartProductContext = useContext(cartProductContext);
  const [products, setProducts] = useState([]);
  const [totalPrice,setTotalPrice]= useState(0);

  useEffect(() => {
    let tmp = 0;
    if (CartProductContext) {
      setProducts(CartProductContext.cartProduct);
    }
    if (CartProductContext.cartProduct) {
      tmp = CartProductContext.cartProduct.reduce((acc,curr) => acc+curr.price,0)
    }
    setTotalPrice(tmp);
  }, [CartProductContext])

  const removeProductHandler = (product) => {
    let tmpArr = [];
    let allProduct = [...products];
    if (CartProductContext.cartProduct) {
      tmpArr = CartProductContext.cartProduct.map((ele) => ele.id)
    }
    if (product.id) {
      let index = tmpArr.indexOf(product.id)
      if (index !== -1) {
        allProduct.splice(index, 1);
        CartProductContext.setCartProduct(allProduct)
      }
    }
  }


  return (
    <>
      <div className="flex h-full pl-20 pr-20 right-0  flex-col bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mt-8">
            <div className="flow-root">
            {products.length>0?  <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product.image}
                        src={product.image}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className='flex'>
                        <p className="text-gray-500">Qty</p>
                        <select>
                          <option value="1" selected="selected">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        </div>
                        <div className="flex">
                          <button type="button" onClick={() => removeProductHandler(product)} className="font-medium text-indigo-600 hover:text-indigo-500">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>:<h2>Please Add Product in Cart</h2>}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{totalPrice}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link to="/">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
