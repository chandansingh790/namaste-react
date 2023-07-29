import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
	const [resLists, setResLists] = useState([]);
	const [filterRes, setfilterRes] = useState([]);
	const [searchRes, setSearchRes] = useState("");

	useEffect(() => {
		api_request();
	}, []);
	const api_request = async () => {
		const data = await fetch(
			"https://gofoodsserver.onrender.com/api/restaurants/?lat=12.9715987&lng=77.5945627"
		);
		const json = await data.json();
		console.log(json);
		setResLists(
			json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
		);
		setfilterRes(
			json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
		);
		console.log(resLists);
	};
	if (resLists.length === 0) {
		return <Shimmer />;
	}

	return (
		<div className="body">
			<div className="filter">
				<div className="search-box1">
					<input
						type="text"
						className="search-box"
						value={searchRes}
						onChange={(e) => {
							setSearchRes(e.target.value);
						}}
					/>
					<button
						className="search-btn"
						onClick={() => {
							const filteredresData = resLists.filter((filterRest) =>
								filterRest?.info?.name
									.toLowerCase()
									.includes(searchRes.toLowerCase())
							);
							setfilterRes(filteredresData);
						}}
					>
						Search
					</button>
				</div>
				<div className="top-rest">
					<button
						className="top-res-btn"
						onClick={() => {
							const filteredData = resLists.filter(
								(res) => res?.info?.avgRating >= 4.3
							);
							setfilterRes(filteredData);
						}}
					>
						Top Rated Restaurants
					</button>
				</div>
			</div>
			<div className="res-container">
				{filterRes.map((restaurant) => (
					<Link
						key={restaurant?.info?.id}
						to={`/restaurant/${restaurant?.info?.id}`}
					>
						<RestaurantCard resData={restaurant} />
					</Link>
				))}
				{/* <RestaurantCard resData={resLists} /> */}
			</div>
		</div>
	);
};
export default Body;
