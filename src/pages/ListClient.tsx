import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header, Card } from "../components";
import { listClients, deleteCLient } from "../services/request";

const ListClient = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<Client[]>([]);
	const [search, setSearch] = useState<string>();
	useEffect(() => {
		listClients().then((response) => {
			const { data } = response;
			setData(data);
		});
	},[]);

	const destroyClient = async(id:string) => {
		await deleteCLient(id);
		listClients().then((response) => {
			const { data } = response;
			setData(data);
		});
	};
	const updateClient = (id:string) => {
		navigate(`/clients/edit/${id}`);
	};
	const filtredClients = search ? 
		data.filter((client) => client.cpf.includes(search)) 
		: null;
	return(
		<main>
			<Header />
			<div>
				<Link to="/clients/new">Novo Cliente</Link>
			</div>
			<label htmlFor="search">
				Procurar:
				<input 
					id="search"
					name="search"
					type="number"
					onChange={(e) => setSearch(e.target.value)}
					placeholder="digite apenas números"
				/>
			</label>
			<div>
				{
					filtredClients ?
						filtredClients.map((client) => {
							return(
								<Card 
									client={client} 
									key={client.id}
									updateClient={updateClient}
									destroyClient={destroyClient}/>
							);
						})						
						:
						data.map((client) => {
							return(
								<Card 
									client={client}
									key={client.id}
									updateClient={updateClient}
									destroyClient={destroyClient}/>
							);
						})
				}
			</div>
		</main>
	);
};
export default ListClient;
