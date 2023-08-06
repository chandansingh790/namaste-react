const RestaurantCard = (props) => {
	const { resData } = props;
	const { name, cloudinaryImageId, cuisines, costForTwo, sla, avgRating } =
		resData?.info;
	return (
		<div className="m-3 bg-white p-4 w-80 rounded-xl h-[360px] shadow-[-0_0_1px_1px_rgb(218, 213, 213)] hover:scale-105 relative group">
			<img
				className="h-48 w-72 rounded-t-xl"
				alt="resImage"
				src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
			/>
			<h1 className="text-gray-600">
				<b>{name}</b>
			</h1>
			<span className="text-gray-500">{cuisines.join(", ")}</span>
			<div className="flex text-gray-500">
				<ul className="flex">
					<li className="mr-3">{avgRating} Stars</li>
					<li className="mr-4">.</li>
					<li className="mr-4">{sla.deliveryTime} MINS</li>
					<li className="mr-4">.</li>
					<li>{costForTwo}</li>
				</ul>
			</div>
			<div
				className="absolute opacity-0 px-4
                                group-hover:opacity-60 left-0 bottom-[152px]"
			>
				<button
					className="px-2 py-2 text-sm rounded w-72
                                            text-amber-100 bg-gray-700"
					onClick={(e) => {
						alert("Item added to cart");
						e.preventDefault();
					}}
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export const withPromotedLabel = (RestaurantCard) => {
	return (props) => {
		return (
			<div className="relative">
				<label className="z-[1] absolute ml-4 text-white rounded-md bg-gray-600 px-4">Open</label>
				<RestaurantCard {...props}/>
			</div>
		);
	}
};

export default RestaurantCard;
