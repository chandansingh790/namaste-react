import { useEffect, useState, useContext } from "react";
import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import {FETCH_SWIGGY_API} from '../utils/constants.js';
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
	const [resLists, setResLists] = useState([]);
	const [filterRes, setfilterRes] = useState([]);
	const [searchRes, setSearchRes] = useState("");

	const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

	const { loggedInUser, SetUserName } = useContext(UserContext);

	useEffect(() => {
		api_request();
	}, []);
	const api_request = async () => {
		const data = await fetch(FETCH_SWIGGY_API);
		const json = await data.json();
		setResLists(
			json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
		);
		setfilterRes(
			json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
		);
	};

	
	const onlineStatus = useOnlineStatus();
	if (onlineStatus === false) {
		return (
			<h1>Looks like your are ofline. Kindly check your internet connection</h1>
		);
	}

	if (resLists.length === 0) {
		return <Shimmer />;
	}

	return (
		<div className="bg-[#FBF8BE]">
			<div className="flex p-3 ml-16">
				<div>
					<input
						type="text"
						className="p-2 border-2 border-yellow-300 border-solid rounded-lg"
						value={searchRes}
						onChange={(e) => {
							setSearchRes(e.target.value);
						}}
					/>
				</div>
				<div className="ml-5">
					<button
						className="p-2 border-slate-500 ... rounded-lg w-20 bg-rose-200 mt-1 hover:bg-rose-300"
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
				<div className="text-center p-1">
					<button
						className="border-1 text-lime-950 border-slate-500 ... rounded-lg bg-indigo-200 mx-5 p-2 hover:bg-indigo-300"
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
				<div>
					<label className="mx-2">
						<b>User Name</b>
					</label>
					<input
						type="text"
						className="p-2 border-2 border-yellow-300 border-solid rounded-lg"
						value={loggedInUser}
						onChange={(e) => {
							SetUserName(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="flex flex-wrap ml-16 p-2">
				{filterRes.map((restaurant) => (
					<Link
						key={restaurant?.info?.id}
						to={`/restaurant/${restaurant?.info?.id}`}
					>
						{restaurant?.info?.isOpen ? (
							<RestaurantCardPromoted resData={restaurant} />
						) : (
							<RestaurantCard resData={restaurant} />
						)}
					</Link>
				))}
			</div>
		</div>
	);
};
export default Body;
