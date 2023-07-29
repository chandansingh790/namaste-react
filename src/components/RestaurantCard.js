const RestaurantCard = (props) => {
	const { resData } = props;
	const { name, cloudinaryImageId, cuisines, costForTwo, sla, avgRating } =
		resData?.info;
	return (
		<div className="res-card">
			<img
				className="res-img"
				alt="resImage"
				src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
			/>
			<h3>{name}</h3>
			<span>{cuisines.join(", ")}</span>
			<div className="details">
				<ul>
					<li>{avgRating} Stars</li>
					<li>.</li>
					<li>{sla.deliveryTime} MINS</li>
					<li>.</li>
					<li>{costForTwo}</li>
				</ul>
			</div>
		</div>
	);
};

export default RestaurantCard;
