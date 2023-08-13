import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart, getTotals } from "../utils/cartSlice";
const Cart = () => {
	const cart = useSelector((store) => store.cart);
	const addedItems = cart?.cartItems;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTotals());
	}, [cart,dispatch]);

	const clearCartHandle = () => {
		dispatch(clearCart());
	};

	return (
		<div className="bg-white">
			{addedItems.length !== 0 ? (
				<div className="p-2 text-center">
					<span className="border px-4 text-lg font-semibold bg-red-200 rounded-md">Cart ({cart.cartTotalQuantity})</span>
					<div className="relative border w-56 mx-1 rounded-md bg-fuchsia-100">
						<Link to="/">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="20"
								fill="currentColor"
								className="bi bi-arrow-left w-10 h-9 text-red-700 "
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
								/>
							</svg>
							<span className="text-lg animate-bounce absolute bottom-0 left-12 text-green-600">
								Continue Fooding
							</span>
						</Link>
					</div>
					<button
						className="bg-teal-500 px-2 rounded-lg absolute right-20 top-32"
						onClick={clearCartHandle}
					>
						<h3 className="text-white">Clear Cart</h3>
					</button>
				</div>
			) : (
				<></>
			)}
			{addedItems.length === 0 ? (
				<div className="mt-20 border  border-blue-200 bg-yellow-50 shadow rounded-md p-4 max-w-sm w-full mx-auto">
					<p className="text-3xl font-serif  inline-block p-2">
						Your Cart looking Sad.
					</p>
					<div className="relative border bg-purple-100 rounded-md">
						<Link to="/">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="20"
								fill="currentColor"
								className="bi bi-arrow-left w-20 h-8 ml-14 text-red-700 "
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
								/>
							</svg>
							<span className="text-lg absolute bottom-0 right-20 animate-bounce text-green-600">
								Continue Fooding
							</span>
						</Link>
					</div>
				</div>
			) : (
				<div className="flex">
					<div className="m-2">
						{addedItems.map((item) => (
							<CartItems items={item} />
						))}
					</div>
					{addedItems.length != 0 ? (
						<div className="w-3/12 p-5 ml-20 mt-2 h-40 bg-blue-100 shadow border-black sticky top-24">
							<span className="text-md font-semibold">
								SubTotal ({cart.cartTotalQuantity} items) : ₹{" "}
								<strong>{cart.cartTotalAmount}</strong>
							</span><br></br>
							<button className="text-md font-mono bg-yellow-300 w-60 ml-10 shadow p-1 rounded-lg mt-16">Checkout</button>
						</div>
					) : (
						<></>
					)}
				</div>
			)}
		</div>
	);
};
export default Cart;
