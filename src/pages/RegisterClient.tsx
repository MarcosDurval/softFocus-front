import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Header,
	Form,
} from "../components";

import { registerClient } from "../services/request";

import convertClient from "../utils/ajustTypes";
import cpfMask from "../utils/cpfMask";
import isValidCpf from "../utils/validCpf";
import isValidEmail from "../utils/validEmail";

import "../styles/pages/register.scss";
interface responseError {
	bad: boolean
	service: boolean
}

const RegisterClient = () => {
	const navigate = useNavigate();
	const [client, setClient] = useState<InputClient>({event:1});
	const [erro, setError] = useState<responseError>({
		bad:false,
		service: false
	});
	
	const [modal, setModal] = useState(false);
	const [valid, setValid] = useState({
		email:false,
		cpf: false
	});

	const validNewClient = async(client:InputClient) => {
		const clientWithoutMask = convertClient(client as SendInputClient);
		const data = await registerClient(clientWithoutMask);
		if(data.status === 201){
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
		await validNewClient(client);
	};

	const handleChange = ({name, value}:{name:string, value:string | number}) => {
		if (name === "cpf"){
			const cpfWithMask = cpfMask(value as string);
			setClient((prev) => ({...prev, cpf:cpfWithMask}));
			return;
		}
		setClient((prev) => ({...prev, [name]:value}));
	};

	return(
		<main>
			<Header />
			<h1 className="text-header">Cadastro</h1>
			<Form 
				handleChange={handleChange} 
				client={client}
				valid={valid}
				handleSubimit={handleSubimit}
				setModal={setModal}
				erro={erro}
				modal={modal}
			/>
			
		</main>
	);
};

export default RegisterClient;
