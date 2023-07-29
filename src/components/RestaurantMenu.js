import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
	const [restaurant, setRestaurant] = useState(null);

    const resData = useParams();
    console.log(resData);
	useEffect(() => {
		fetchMenu();
	}, []);


	const fetchMenu = async () => {
		const data = await fetch(
			`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${resData.resId}`
		);
		const json = await data.json();
		console.log(json.data);
		setRestaurant(json.data);
	};

	if (restaurant === null) return <Shimmer />;


	const {
		avgRating,
		cuisines,
		costForTwoMessage,
		name,
		sla,
		totalRatingsString,
	} = restaurant?.cards[0]?.card?.card?.info;
	const { itemCards } =
		restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
			?.card;

	return (
		<div className="res-menu">
			<div className="menu-details">
				<h1>{name}</h1>
				<h3>{cuisines[0]}</h3>
				<p>{avgRating} star</p>
				<p>{totalRatingsString}</p>
				<p>{sla.slaString}</p>
				<p>{sla.lastMileTravelString} </p>
				<p>
					<b>Items Available</b>
				</p>
				{itemCards.map((items) => {
					return (
						<li key={items?.card?.info?.id}>
							{items?.card?.info?.name} - Rs {items?.card?.info?.price/100}
						</li>
					);
				})}
			</div>
		</div>
	);
};
export default RestaurantMenu;
