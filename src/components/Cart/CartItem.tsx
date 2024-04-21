import { useCart} from "../../context/CartProvider.tsx";
import {CartProduct} from "../../types/utils.ts";

const CartItem = (props: CartProduct) => {
    const { removeProduct } = useCart();
    const handleRemove = () => {
        removeProduct(props.id);
    }

    return (
        <li key={props.id} className="flex py-6">
            <div className="flex-shrink-0">
                <img
                    src={props.thumbnail}
                    alt={props.thumbnail}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                    <div className="flex justify-between">
                        <h4 className="text-sm">
                            <p className="font-medium text-gray-700 dark:text-gray-100">
                                {props.title}
                            </p>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">${props.price * props.quantity}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{props.brand}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Quantity: {props.quantity}</p>
                </div>

                <div className="mt-4 flex flex-1 items-end justify-between">
                    <div className="ml-4">
                        <button onClick={handleRemove} type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-blue-200">
                            <span>Remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )

}
export default CartItem;