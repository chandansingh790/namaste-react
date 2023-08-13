import {useDispatch} from "react-redux";
import { addToCart, getTotals } from "../utils/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RestaurantMenuItem = (item) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	/* useEffect(() => {
		dispatch(getTotals());
	}, [addToCart]); */

	const handleAddItem = (items) => {
		dispatch(addToCart(items));
		toast.info("Item Added to Cart Successfully", {
			position: "bottom-left",
			autoClose: 1000,
			theme:"colored",
			
		},
		//navigate("/cart")
		);
		dispatch(getTotals());

	};
	const imageUrl =
		"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/";
	return (
		<div>
			{item.data.map((items) => (
				<div key={items?.card?.info?.id} className="text-start m-2 p-2">
					<div className="justify-start mb-5 relative">
						<h1 className="font-semibold text-gray-700">
							{items?.card?.info?.name}
						</h1>
						<span>₹ {items?.card?.info?.price / 100}</span>
						<div className="w-24 h-24 border absolute right-1 bottom-0 top-2 bg-gray-100 rounded-lg">
							<img
								src={imageUrl + items?.card?.info?.imageId}
								className="relative"
							/>
							<div className="w-20 h-8 border left-2 top-20 shadow-xl bg-white rounded-md text-center absolute text-green-500 font-bold">
								<button onClick={() => handleAddItem(items)}>ADD</button>
							</div>
						</div>
					</div>
					<p className="text-gray-400 w-10/12 h-18 text-sm">
						{items?.card?.info?.description}
					</p>
					<hr className="mt-10 bg-[#f1f1f6]" />
				</div>
			))}
		</div>
	);
};
export default RestaurantMenuItem;
