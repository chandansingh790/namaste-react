import { useState } from "react";
import RestaurantMenuItem from "./RestaurantMenuItem";
const RestaurantCategory = ({data, showIndex, showItems}) => {
	const [arrowButton, setArrowButton] = useState("🔽");

	const handleClick = () => {
		arrowButton == "🔽" ? setArrowButton("🔼") : setArrowButton("🔽");
		showIndex == false ? showItems() : showItems('-1');
	};

	return (
		<div>
			<div className="p-2 text-center bg-white">
				<div className=" mx-auto bg-gray-50 p-3">
					<div className="relative flex cursor-pointer" onClick={handleClick}>
						<button>
							<span className="font-bold">
								{data.title} ({data.itemCards.length})
							</span>
							<span className="absolute right-3">{arrowButton}</span>
						</button>
					</div>
					<div>{showIndex && <RestaurantMenuItem data={data.itemCards} />}</div>
				</div>
			</div>
			<hr className="h-4 bg-[#f1f1f6]"></hr>
		</div>
	);
};
export default RestaurantCategory;
