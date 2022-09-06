import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
	Cpf, 
	Email, 
	Header, 
	Latitude, 
	Longitude,
	Loading, 
	Modal, 
	Name, 
	Tillage, 
	Event, 
	Date } from "../components";

import { getClientById, updateClient } from "../services/request";

import cpfMask from "../utils/cpfMask";
import isValidCpf from "../utils/validCpf";
import isValidEmail from "../utils/validEmail";

interface responseError {
	bad: boolean
	service: boolean
}

const EditClient = () => {
	window.location.pathname;
	const ID = window.location.pathname.split("/").pop();
	const [load, setLoad] = useState<boolean>(true);
	useEffect(() => {
		getClientById(ID as string).then(response => {
			if (response.data?.name){
				setClient(() => ({...response.data}));
			}else{
				setNone(true);
			}
		}).catch(() => {
			setNone(true);
		}).finally(() => {
			setLoad(false);
		});
	},[]);

	const navigate = useNavigate();
	const [none, setNone] = useState<boolean>(false);
	const [client, setClient] = useState<InputClient>({});
	const [erro, setError] = useState<responseError>({
		bad:false,
		service: false
	});
	
	const [modal, setModal] = useState(false);
	const [valid, setValid] = useState({
		email:false,
		cpf: false
	});

	const validUpdateClient = async(client:InputClient) => {
		const clientWithoutMask = {...client};
		clientWithoutMask.cpf = clientWithoutMask.cpf?.replace(/\D/g,"");
		const data = await updateClient(ID as string,clientWithoutMask);
		if(data.status === 200){
			return navigate("/clients");
		}
		else if (data.status === 409){
			setModal(true);
			return;
		}
		else if (data.status === 400){
			setError((prev) => ({...prev, bad:true}));
			setTimeout(() => {
				setError((prev) => ({...prev, bad:false}));
			},5000);
			return;
		}
		else{
			setError((prev) => ({...prev, service:true}));
			setTimeout(() => {
				setError((prev) => ({...prev, service:false}));
			},5000);
		}
	};

	const handleSubimit = async(e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const EMAILVALID = !isValidEmail(client.email as string);
		const CPFVALID = !isValidCpf(client.cpf as string);
		setValid(() => ({
			email: EMAILVALID,
			cpf: CPFVALID
		}));
		if (EMAILVALID || CPFVALID) {
			return;
		}
		await validUpdateClient(client);
	};

	const handleChange = ({name, value}:{name:string, value:string | number}) => {
		if (name === "cpf"){
			const cpfWithMask = cpfMask(value as string);
			setClient((prev) => ({...prev, cpf:cpfWithMask}));
			return;
		}
		setClient((prev) => ({...prev, [name]:value}));
	};

	if(load){
		return(
			<Loading/>
		);
	}
	
	return(
		<main>
			<Header />
			<h1>Editar</h1>
			{
				none ?
					<h1>Usuario não existe</h1>
					:
					<form onSubmit={handleSubimit}>
						<Name handleChange={handleChange} name={client.name}/>
						<Email handleChange={handleChange} email={client.email}/>
						{valid.email ? 
							<p data-testid="fail-email" className="alert">Email Inválido</p>
							: null
						}
						<Cpf handleChange={handleChange} cpf={client.cpf}/>
						{valid.cpf ? 
							<p data-testid="fail-cpf" className="alert">CPF Inválido</p>
							: null
						}
						<Date handleChange={handleChange} date={client.date}/>
						<Tillage handleChange={handleChange} type_tillage={client.type_tillage}/>
						<Event handleChange={handleChange} event={client.event}/>
						<Latitude handleChange={handleChange} latitude={client.latitude}/>
						<Longitude handleChange={handleChange} longitude={client.longitude}/>
						<button type='submit'>Editar</button>
						{modal && <Modal setModal={setModal}/>}
						{erro.bad && <p data-testid="bd-request">Cheque os campos inseridos</p>}
						{erro.service && <p data-testid="svc-request">Não foi possivel realizar ação tente novamente mais tarde</p>}
					</form>
			}
			
		</main>
	);
};

export default EditClient;
