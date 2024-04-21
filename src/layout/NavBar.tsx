import {useEffect, useState} from 'react';
import {NavLink, Outlet} from "react-router-dom";
import Layout from "./Layout.tsx";
import {classNames} from "../utils/utils.ts";
import {searchProducts} from "../api";
import {useProducts} from "../context/ProductProvider.tsx";
import { useLocation } from 'react-router-dom';
import {useCart} from "../context/CartProvider.tsx";

const NavBar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const [isDarkMode, setDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { setProducts, setHasMore} = useProducts();
    const { getItemCount } = useCart();
    const handleSearch = async () => {
        const result = await searchProducts(searchQuery);
        setHasMore(result.total !== result.limit);
        setProducts(result.products);
    };
    const getNavLinkClass = (isActive: boolean) => {
        return classNames(
            "rounded-md px-3 py-2 text-sm font-medium",
            isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
        );
    };
    const getNavLinknClassMobile = (isActive: boolean) => {
        return classNames(
            "block rounded-md px-3 py-2 text-base font-medium",
            isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
        );
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <>
            <nav className="bg-gray-800 border-b border-white">
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex items-center px-2 lg:px-0">
                            <div className="hidden lg:ml-6 lg:flex">
                                <div className="flex space-x-4">
                                    <NavLink to={"/"} className={({isActive}) => getNavLinkClass(isActive)}>
                                        Home
                                    </NavLink>
                                    <NavLink to={"/cart"} className={({isActive}) => getNavLinkClass(isActive)}>
                                        Cart
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        {isHomePage && (
                            <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                                <div className="w-full max-w-lg lg:max-w-xs">
                                    <input
                                        className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder-gray-400 focus:bg-white focus:text-gray-900 sm:text-sm"
                                        placeholder="Search"
                                        type="search"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                handleSearch().catch(error => console.error('Error while searching products:', error));
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        <NavLink to="/cart"
                                 className="relative inline-block ml-auto p-2 rounded-md text-gray-400 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                            </svg>
                            {getItemCount() > 0 && (
                                <span
                                    className="absolute top-2 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                    {getItemCount()}
                                </span>
                            )}
                        </NavLink>
                        <div className="flex">
                            <button
                                className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                                onClick={() => setDarkMode(!isDarkMode)}
                            >
                                {isDarkMode ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                     <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                            </svg>
                                )}
                            </button>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                                onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? 'X' : '≡'}
                            </button>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <NavLink to={"/"} className={({isActive}) => getNavLinknClassMobile(isActive)}>
                                Home
                            </NavLink>
                            <NavLink to={"/cart"} className={({isActive}) => getNavLinknClassMobile(isActive)}>
                                Cart
                            </NavLink>
                        </div>
                    </div>
                )}
            </nav>
            <Layout>
                <Outlet/>
            </Layout>
        </>
    );
}

export default NavBar;