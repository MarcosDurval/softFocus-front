import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import EditClient from "./pages/EditClient";
import ListClient from "./pages/ListClient";
import NotFound from "./pages/NotFound";
import RegisterClient from "./pages/RegisterClient";

const AllRouters = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/clients" element={<ListClient />} />
				<Route path="/clients/new" element={<RegisterClient />}/>
				<Route path="/clients/edit/:id" element={<EditClient />}/>
				<Route path="/" element={<Navigate to="/clients"/> }/>
				<Route path="*" element={<NotFound />}/>
			</Routes>
		</BrowserRouter>

	);
};
export default AllRouters;