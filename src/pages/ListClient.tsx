import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header, Card, Loading } from "../components";
import { listClients, deleteCLient } from "../services/request";

import "../styles/pages/listCard.scss";


const ListClient = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<Client[]>([]);
	const [search, setSearch] = useState<string>();
	const [load, setLoad] = useState(true);

	useEffect(() => {
		listClients().then((response) => {
			const { data } = response;
			setData(data);
		})
			.finally(() => setLoad(false));
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
	
	if (load){
		return(
			<Loading />
		);
	}

	return(
		<main id="main-list">
			<Header />
			<div id='events'>
				<label htmlFor="search">
				Procurar por CPF:
					<input 
						id="search"
						name="search"
						type="number"
						onChange={(e) => setSearch(e.target.value)}
						placeholder="digite apenas números"
					/>
				</label>
				<h2 >
					<Link 
						id="new-cl" 
						to="/clients/new">
							Cadastrar Novo Cliente
					</Link>
				</h2>
			</div>
			
			<div className="list-card">
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
