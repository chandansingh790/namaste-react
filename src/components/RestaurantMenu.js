import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
	const resData = useParams();
	const restaurant = useRestaurantMenu(resData.resId);

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
