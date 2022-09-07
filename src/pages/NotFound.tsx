import { Link } from "react-router-dom";

import "../styles/components/loading.scss";

const NotFound = () => {
	return (
		<div id="center">
			<h1>Parece que você está perdido</h1>
			<Link to="clients">Inicio</Link>
		</div>
	);
};
export default NotFound;
