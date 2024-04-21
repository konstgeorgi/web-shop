import {useState,useEffect} from "react";
import {ProductResponse} from "../../types/apiCall.ts";
import {getProducts, getCategories} from "../../api";
import Card from "../../components/Card/Card.tsx";
import { useProducts} from "../../context/ProductProvider.tsx";
import CategoryButton from "../../components/Button/CategoryButton.tsx";

const Home = () => {
    const {products, setProducts,hasMore, setHasMore, sortHighest,sortLowest,sortHighestDiscount,sortHighestStock} = useProducts();
    const [categories,setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [refetch,setRefetch] = useState(false);

    const handleAllClick = () => {
        setProducts([]);
        setPage(0);
        setRefetch(prev => !prev);
    };

    const fetchProducts = async () => {
        try {
            const data: ProductResponse = await getProducts(10, page * 10);
            setHasMore(data.total !== data.skip);
            setProducts(oldProducts => {
                const newProducts = [...oldProducts, ...data.products];
                return newProducts.filter((product, index, self) =>
                    index === self.findIndex((p) => p.id === product.id)
                );
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading products:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts().catch(error => console.error('Error while getting products:', error));
    }, [page,refetch]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };
        fetchCategories().catch(error => console.error('Error while getting categories:', error));}, []);
    const handleLoadMore = () => {
        setPage(oldPage => oldPage + 1);
    };
    if (isLoading) return <p>Loading...</p>;

    return (
        <section>
            <main>
                <div className="isolate rounded-md flex overflow-x-auto whitespace-nowrap gap-4 mb-4 scrollbar-none">
                    <button
                            onClick={handleAllClick}
                            type="button"
                            className="rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset ring-gray-700 hover:bg-gray-700 hover:text-white"
                    >
                        All
                    </button>
                    {categories.map((category: string) => (
                        <CategoryButton key={category} category={category}/>
                    ))}
                </div>
                <div
                    className="isolate rounded-md flex overflow-x-auto whitespace-nowrap gap-4 mb-10 scrollbar-none">
                    <button
                        onClick={sortHighest}
                        type="button"
                        className="rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset ring-gray-700 hover:bg-gray-700 hover:text-white"
                    >
                        Highest Price
                    </button>
                    <button
                        onClick={sortLowest}
                        type="button"
                        className="rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset ring-gray-700 hover:bg-gray-700 hover:text-white"
                    >
                        Lowest Price
                    </button>
                    <button
                        onClick={sortHighestDiscount}
                        type="button"
                        className="rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset ring-gray-700 hover:bg-gray-700 hover:text-white"
                    >
                        Highest Discount
                    </button>
                    <button
                        onClick={sortHighestStock}
                        type="button"
                        className="rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset ring-gray-700 hover:bg-gray-700 hover:text-white"
                    >
                        Highest Stock
                    </button>
                </div>
                <div>
                    <ul role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {products.map(product => (
                            <Card key={product.id} {...product}/>
                        ))}
                    </ul>
                    {hasMore && (
                        <div className="mt-10">
                            <button
                                onClick={handleLoadMore}
                                type="button"
                                className="rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset ring-gray-700 hover:bg-gray-700 hover:text-white"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </section>
    )
}
export default Home;