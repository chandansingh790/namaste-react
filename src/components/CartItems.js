import { useDispatch } from "react-redux";
import { addToCart, removeCartItem, decreaseQuantityItem } from "../utils/cartSlice";
const CartItems = (props) => {

	const dispatch = useDispatch();
	const { items } = props;
	const { name, imageId, itemAttribute, category, price, id } =
		items.card.info;
	const imageUrl =
		"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/";
	const increaseQuantitiy = (item) => {
		dispatch(addToCart(item));
	};
	const decreaseQuantitiy = (id) => {
		dispatch(decreaseQuantityItem(id));
	};
	const removeCartItemHandle = (id) => {
		dispatch(removeCartItem(id));
	};
	return (
		<div className="w-7/12 p-3 ml-[460px] bg-pink-100 border-black">
			<div className="flex justify-normal">
				<img className="w-20 h-25" src={imageUrl + imageId} />
				<div className="w-72 ml-3">
					<h3 className="text-md font-bold text-gray-700">{name}</h3>
					<h3 className="text-sm font-semibold text-gray-700">{category}</h3>
					{itemAttribute.vegClassifier == "NONVEG" ? (
						<img
							width="28"
							height="28"
							src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png"
							alt="vegetarian-food-symbol"
						/>
					) : (
						<img
							width="28"
							height="28"
							src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
							alt="vegetarian-food-symbol"
						/>
					)}
				</div>
				<div className="font-bold ml-28">
					₹ {items.itemQuantity * (price / 100)}
				</div>
			</div>
			<div className="flex mt-2 mb-4">
				<button
					onClick={() => decreaseQuantitiy(id)}
					className="rounded-full w-7 h-7 bg-white border border-gray-400 p-1 text-center justify-center"
				>
					<hr className="w-3 border h-1 m-auto bg-gray-500"></hr>
				</button>

				<div className="w-8 h-7 border border-gray-500 mx-2">
					<span className="ml-2">{items.itemQuantity}</span>
				</div>
				<button
					onClick={() => increaseQuantitiy(items)}
					className="rounded-full w-7 h-7 bg-white border border-gray-400 text-center font-bold justify-center"
				>
					+
				</button>
				<button
					onClick={() => removeCartItemHandle(id)}
					className="border p-1 mx-4 rounded-lg bg-yellow-100"
				>
					<h1 className="text-md px-2 text-gray-500">Remove</h1>
				</button>
			</div>
			<hr className="bg-gray-900 h-0 shadow"></hr>
		</div>
	);
};
export default CartItems;
