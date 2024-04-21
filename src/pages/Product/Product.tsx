import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProduct} from "../../api";
import {Product as iProduct} from "../../types/apiCall.ts";
import {useCart} from "../../context/CartProvider.tsx";


const Product = () => {
    const [product,setProduct] = useState<iProduct>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {id } = useParams<{ id: string }>();
    const { addProduct } = useCart();

    const handleAddToCart = () => {
        if (product) {
            addProduct(product);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            if (!id) {
                console.error('Product id is undefined');
                setIsLoading(false);
                setErrorMessage('Product with that id not found');
                return;
            }
            try {
                const data: iProduct = await getProduct(id);
                setProduct(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading product:', error);
                setIsLoading(false);
                setErrorMessage('Product with that id does not exist.');
            }
        };
        fetchProducts().catch(error => console.error('Error while getting products:', error));
    }, []);
    if (isLoading) return <p>Loading...</p>;
    if (errorMessage) return <div>{errorMessage}</div>;

    return (
        <>
            {product && (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 dark:bg-gray-800">
                <div className="lg:max-w-lg lg:self-end">
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">{product.title}</h1>
                        <p className="text-lg text-gray-900 sm:text-xl dark:text-white">Brand: {product.brand}</p>
                    </div>
                    <section className="mt-4">
                        <div className="flex items-center">
                            <p className="text-lg text-gray-900 sm:text-xl dark:text-white">${product.price}</p>
                            <div className="ml-4 border-l border-gray-300 pl-4">
                                <div className="flex items-center">
                                    <p className="ml-2 text-sm text-gray-500 dark:text-gray-300">Discount: {product.discountPercentage}%</p>
                                </div>
                            </div>
                            <div className="ml-4 border-l border-gray-300 pl-4">
                                <div className="flex items-center">
                                    <p className="ml-2 text-sm text-gray-500 dark:text-gray-300">Rating: {product.rating} / 5</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-500 dark:text-gray-300">{product.description}</p>
                        </div>
                    </section>
                </div>
                <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                        <img src={product.images[0]} alt={product.images[0]} className="h-80 w-80 object-cover object-center mx-auto" />
                    </div>
                </div>
                <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                    <section>
                            <div className="sm:flex sm:justify-between">
                            </div>
                            <div className="mt-10">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 dark:text-gray-800 dark:bg-white dark:hover:bg-gray-200"
                                >
                                    Add to bag
                                </button>
                            </div>
                    </section>
                </div>
            </div>
                )}
        </>
    )
}
export default Product;