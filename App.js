import {React, lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from './src/components/Header';
import Body from './src/components/Body';
import '/index.css'
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
// import RestaurantMenu from "./src/components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./src/utils/UserContext";
import {Provider} from 'react-redux';
import appStore from "./src/utils/appStore";
import Cart from "./src/components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTotals } from "./src/utils/cartSlice";

const Grocery = lazy(() => import('./src/components/Grocery'));
const RestaurantMenu = lazy(() => import("./src/components/RestaurantMenu"));

const AppLayout = () => {
	// Authentication Code APi

	// React provides a context Provider to update the data of the created context, By this we can update the created context data.
	// And for this the App should be wrapped inside Provider
	const [userName, SetUserName] = useState();
	appStore.dispatch(getTotals());

	useEffect(() => {
		const data = {
			name: "Chandan Singh",
		};
		SetUserName(data.name);
	}, []);

	return (
		<Provider store={appStore}>
		<UserContext.Provider value={{ loggedInUser: userName, SetUserName }}>
			<div className="app">
			<ToastContainer />
				<Header />
				<Outlet />
			</div>
		</UserContext.Provider>
		</Provider>
	);
}

const routingPath = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Body />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/grocery",
				element: (
					<Suspense fallback={<h1>Loading..</h1>}>
						<Grocery />
					</Suspense>
				),
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/restaurant/:resId",
				element: (
					<Suspense fallback={<h1>Loading..</h1>}>
						<RestaurantMenu />
					</Suspense>
				),
			},
		],
		errorElement: <Error />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={routingPath} />);

