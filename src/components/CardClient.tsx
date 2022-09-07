import cpfMask from "../utils/cpfMask";
import "../styles/components/card.scss";

interface Props { 
  client: Client
	destroyClient: (id:string) => void
	updateClient: (id:string) => void
}

const Card = ({client, destroyClient, updateClient}:Props) => {
	const convertDate = (data:Date) => {
		const date =  new Date(`${data} 00:00`);
		return date.toLocaleDateString("pt-BR", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	};

	return (
		<div className="client">
			<div className="container-cl">
				<p>Nome: {client.name}</p>
				<p>CPF: {cpfMask(client.cpf)}</p>
				<p>Email: {client.email}</p>
				<p>Evento ocorrido: {client.event}</p>
				<p>Tipo da lavoura: {client.type_tillage}</p>
				<p>Data: {convertDate(client.date)}</p>
			</div>
			<div className="container-lc">
				<div>
					<h6>Localização:</h6>
					<p>{client.latitude}</p>
					<p>{client.longitude}</p>
				</div>
				<div className="group-btn">
					<button onClick={()=> updateClient(client.id)} >Editar</button>
					<button onClick={() => destroyClient(client.id)}>Deletar</button>
				</div>
			</div>
			
		</div>
	);
};

export default Card;
