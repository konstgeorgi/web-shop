import {useCart} from "../../context/CartProvider.tsx";
import CartItem from "../../components/Cart/CartItem.tsx";
import {CartProduct} from "../../types/utils.ts";

const Cart = () => {
    const { cart,getTotal } = useCart();

    return (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
                <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Shopping Cart</h1>
                <main className="mt-12">
                    <section>
                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {cart.length === 0 ? (
                                <div className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl mt-10 mb-10 dark:text-white"><h2>Cart is empty</h2></div>
                            ) : (
                                cart.map((product: CartProduct) => (
                                    <CartItem key={product.id} {...product} />
                                ))
                            )}
                        </ul>
                    </section>
                    <section className="mt-10">
                        <div>
                            <dl className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-base font-medium text-gray-900 dark:text-white">Subtotal</dt>
                                    <dd className="ml-4 text-base font-medium text-gray-900 dark:text-white">${getTotal()}</dd>
                                </div>
                            </dl>
                        </div>
                    </section>
                </main>
            </div>
    )
}

export default Cart;