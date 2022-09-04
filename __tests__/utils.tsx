// test utils file
import {render} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderWithRouter = (ui:React.ReactElement, {route = "/"} = {}) => {
	window.history.pushState({}, "Test page", route);

	return {
		user: userEvent.setup(),
		...render(ui, {wrapper: BrowserRouter}),
	};
};

export default renderWithRouter;