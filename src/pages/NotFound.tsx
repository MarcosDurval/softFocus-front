import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div>
			<h1>Parece que você está perdido</h1>
			<Link to="clients">Inicio</Link>
		</div>
	);
};
export default NotFound;
