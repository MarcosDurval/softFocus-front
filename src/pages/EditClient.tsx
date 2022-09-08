import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
	Header, 
	Loading,  
} from "../components";
import Form from "../components/Form";

import { getClientById, updateClient } from "../services/request";


import convertClient from "../utils/ajustTypes";
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
		const clientWithoutMask = convertClient(client as SendInputClient);
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
			<h1 className="text-header">Editar</h1>
			{
				none ?
					<h1 className="text-header">Usuario não existe</h1>
					:
					<Form 
						handleChange={handleChange} 
						client={client}
						valid={valid}
						handleSubimit={handleSubimit}
						setModal={setModal}
						erro={erro}
						modal={modal}
					/>
			}
			
		</main>
	);
};

export default EditClient;
