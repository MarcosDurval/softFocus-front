import cpfMask from "../utils/cpfMask";

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
		<div>
			<p >{client.name}</p>
			<p >{cpfMask(client.cpf)}</p>
			<p>{client.email}</p>
			<p>{client.event}</p>
			<p>{client.type_tillage}</p>
			<p>{convertDate(client.date)}</p>
			<div>
				<h6>Localização:</h6>
				<p>{client.latitude}</p>
				<p>{client.longitude}</p>
			</div>
			<button onClick={()=> updateClient(client.id)} >Editar</button>
			<button onClick={() => destroyClient(client.id)}>Deletar</button>
		</div>
	);
};
export default Card;