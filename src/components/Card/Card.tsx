import {Link} from "react-router-dom";
import {Product} from "../../types/apiCall.ts";

const Card = (props: Product) => {
    return (
        <Link to={`/product/${props.id}`} className="relative">
            <div
                className="flex justify-center items-center group aspect-h-7 aspect-w-10 w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 h-40">
                <img src={props.thumbnail} alt=""
                     className="aspect-w-16 aspect-h-9 pointer-events-none object-cover group-hover:opacity-75 scale-50"/>
            </div>
            <div className="flex justify-between">
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 dark:text-white">{props.title}</p>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 dark:text-white">${props.price}</p>
            </div>
            <div className="flex justify-between">
            <p className="pointer-events-none block text-sm font-medium text-gray-500 dark:text-gray-300">Stock: {props.stock}</p>
            <p className="pointer-events-none block text-sm font-medium text-red-400">Discount: %{props.discountPercentage}</p>
            </div>
        </Link>
    )
}
export default Card;