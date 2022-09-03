import { BrowserRouter, Route, Routes } from "react-router-dom";

import ListClient from "./pages/ListClient";
import RegisterClient from "./pages/RegisterClient";

const AllRouters = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/clients" element={<ListClient />} />
				<Route path="/clients/new" element={<RegisterClient />}/>
			</Routes>
		</BrowserRouter>

	);
};
export default AllRouters;