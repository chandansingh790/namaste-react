import {React, lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from './src/components/Header';
import Body from './src/components/Body';
import '/index.css'
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Grocery = lazy(() => import('./src/components/Grocery'));

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
			<Outlet />
        </div>
    )
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
				path: "/restaurant/:resId",
				element: <RestaurantMenu />,
			},
		],
		errorElement: <Error />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={routingPath} />);

