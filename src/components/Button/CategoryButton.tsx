import {useProducts} from "../../context/ProductProvider.tsx";
import {getCategoryProducts} from "../../api";
import {CategoryButtonProps} from "../../types/utils.ts";


const CategoryButton = (props: CategoryButtonProps) => {
    const { setProducts, setHasMore} = useProducts();
    const handleSearchCategory = async () => {
        const data = await getCategoryProducts(props.category);
        setHasMore(data.total !== data.limit);
        setProducts(data.products);
    }
    return (
        <button onClick={handleSearchCategory}
            type="button"
            className="rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset ring-gray-700 hover:bg-gray-700 hover:text-white"
        >
            {props.category}
        </button>
    );
}
export default CategoryButton;