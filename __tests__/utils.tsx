import {render} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const renderWithRouter = (component: React.ReactElement) => {
	const history = createMemoryHistory();
	return{
		...render(
			<Router navigator={history} location={history.location}> 
				{component}
			</Router>
		),
	};
};

export default renderWithRouter;