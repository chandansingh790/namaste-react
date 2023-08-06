import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
	const resData = useParams();
	const restaurant = useRestaurantMenu(resData.resId);
	const [showItems, setShowItems] = useState(0);

	if (restaurant === null) return <Shimmer />;

	const {
		avgRating,
		cuisines,
		costForTwoMessage,
		name,
		sla,
		totalRatingsString,
	} = restaurant?.cards[0]?.card?.card?.info;
	/* const { itemCards } =
		restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
			?.card; */

	const categories =
		restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
			(c) =>
				c?.card?.card?.["@type"] ===
				"type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
		);

	return (
		<div className="my-16 mx-auto w-6/12">
			<div className=" p-2 flex justify-between bg-gray-50">
				<div>
					<h1 className="font-bold text-lg">{name}</h1>
					<span className="text-gray-400">{cuisines.join(", ")}</span>
				</div>
				<div className="border rounded-md p-1">
					<span className="text-lg font-bold flex text-green-600">
						<svg
							className="w-4 h-4 text-green-600 mr-1 mt-1"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						<span>{avgRating}</span>
					</span>
					<hr className="m-1"></hr>
					<span className="text-[10px] text-gray-400 font-bold">
						{totalRatingsString}
					</span>
				</div>
			</div>
			<hr className="border-dashed border-t-2" />
			<div className="my-4">
				<ul className="flex space-x-6 font-bold">
					<li className="flex space-x-3">
						<svg
							className="mt-1"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
						>
							<circle
								r="8.35"
								transform="matrix(-1 0 0 1 9 9)"
								stroke="#3E4152"
							></circle>
							<path
								d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z"
								fill="#3E4152"
							></path>
						</svg>
						<span>{sla?.slaString}</span>
					</li>
					<li>{costForTwoMessage}</li>
				</ul>
			</div>
			<hr className="h-3 bg-[#f1f1f6]" />
			{categories.map((category, index) => (
				<RestaurantCategory
					key={category?.card?.card.title}
					data={category?.card?.card}
					showIndex={index === showItems ? true : false}
					showItems={(collapse) =>
						collapse == -1 ? setShowItems(collapse) : setShowItems(index)
					}
				/>
			))}
		</div>
	);
};
export default RestaurantMenu;
