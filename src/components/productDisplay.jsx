import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const sortOptions = [
    { name: 'Ascending', href: '#', current: false },
    { name: 'Descending', href: '#', current: false },
]
  
const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            {
                "value": "electronics",
                "label": "electronics",
                "checked": false
            },
            {
                "value": "jewelery",
                "label": "jewelery",
                "checked": false
            },
            {
                "value": "men's clothing",
                "label": "men's clothing",
                "checked": false
            },
            {
                "value": "women's clothing",
                "label": "women's clothing",
                "checked": false
            },
        ],
    },
  ];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function ProductDisplay() {
    const [products, setProducts] = useState([]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [sort, setSort] = useState("Ascending")
    const [checkFilter, setCheckFilter] = useState([]);

    useEffect(() => {
        FetchAllProduct();
    }, [])

    const FetchAllProduct = async () => {
        await axios.get('https://fakestoreapi.com/products')
            .then(res => setProducts(res.data))
            .catch(json => console.log(json))
    }

    const filterHandeler = async(ele)=>{
        let categ = ele;
        if(!checkFilter.includes(ele)){
            setCheckFilter([...checkFilter,ele])
        await axios.get(`https://fakestoreapi.com/products/category/${categ}`)
            .then(res => {
                setProducts(res.data)
            }
            )
            .catch(json => console.log(json))
        }else{
            let index = checkFilter.indexOf(ele);
            let tmparr = [...checkFilter];
            tmparr.splice(index,1)
            setCheckFilter(tmparr)
        }
    }

    const sortHandeler = async (ele)=>{
        let Sort = ele;
        if(sort===ele){
            alert("alredy applied please chose next sort")
        }
        if(ele === "Descending"){
            Sort = "desc";
            setSort("Descending");
        }else{
            Sort = "asc";
            setSort("Ascending")
        }
        await axios.get(`https://fakestoreapi.com/products?sort=${Sort}`)
            .then(res => {
                setProducts(res.data)
            }
            )
            .catch(json => console.log(json))

    }


    return (
        <div className='flex'>

            <div className="bg-white" style={{flex:"10%"}}>
                <div>
                    {/* Mobile filter dialog */}
                    <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                        />

                        <div className="fixed inset-0 z-40 flex">
                            <DialogPanel
                                transition
                                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>

                                    {filters.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                            <h3 className="-mx-2 -my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                        <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-6">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                defaultValue={option.value}
                                                                defaultChecked={option.checked}
                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                type="checkbox"
                                                                onChange={()=>filterHandeler(option.value)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <form className="hidden lg:block">
                                    {filters.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                        <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                defaultValue={option.value}
                                                                defaultChecked={option.checked}
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                type="checkbox"
                                                                onChange={()=>filterHandeler(option.value)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                </form>
                            </div>
                        </section>
                    </main>
                </div>
            </div>



            <div className="bg-red" style={{flex:"90%"}}>
                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 pt-14">

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    onClick={()=>sortHandeler(option.name)}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <Link to={`/productoverview/${product.id}`}>
                                <div key={product.id} className="group relative border-solid border-2 p-2 border-gray-200">

                                    <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">

                                        <img
                                            alt={product.imageAlt}
                                            src={product.image}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />

                                    </div>

                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href={product.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.title}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDisplay;
