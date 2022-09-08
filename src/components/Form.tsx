import InputGeneric from "./InputGeneric";
import { Dispatch, SetStateAction } from "react";
import {Event, Modal} from ".";

interface IForm extends ChangeGeneric{
  client:InputClient
  handleSubimit: (e:React.FormEvent<HTMLFormElement>) => void
  valid: {email:boolean, cpf:boolean}
	erro: {bad:boolean, service:boolean}
	modal: boolean
	setModal: Dispatch<SetStateAction<boolean>>
}

const Form =({handleChange,handleSubimit, client, valid, erro, modal, setModal}:IForm) => {
	return (
		<form id="forms" onSubmit={handleSubimit}>
			<InputGeneric
				handleChange={handleChange}
				name="name"
				value={client.name || ""}
				type="text"
				label="Nome"
			/>
			<InputGeneric
				handleChange={handleChange}
				name="email"
				value={client.email || ""}
				type="email"
				label="Email"
			/>
			{valid.email ? 
				<p data-testid="fail-email" className="alert">Email Inválido</p>
				: null
			}
			<InputGeneric
				handleChange={handleChange}
				name="cpf"
				value={client.cpf || ""}
				type="text"
				label="CPF"
			/>
			{valid.cpf ? 
				<p data-testid="fail-cpf" className="alert">CPF Inválido</p>
				: null
			}
			<InputGeneric
				handleChange={handleChange}
				name="date"
				value={client.date || ""}
				type="date"
				label="Data da colheita"
			/>
			<InputGeneric
				handleChange={handleChange}
				name="type_tillage"
				value={client.type_tillage || ""}
				type="text"
				placeholder="ex: milho"
				label="Tipo da lavoura"
			/>
			<Event handleChange={handleChange} event={client.event}/>
			<InputGeneric 
				type="number"
				label="Latitude"
				handleChange={handleChange}
				value={client.latitude || ""}
				name="latitude"
				placeholder="ex: -26.198338"
			/>
			<InputGeneric 
				type="number"
				label="Longitude"
				handleChange={handleChange}
				value={client.longitude || ""}
				name="longitude"
				placeholder="ex: -52.692396"
			/>
			<button id="submit" type="submit">Enviar</button>
			{modal && <Modal setModal={setModal}/>}
			{erro.bad && <p data-testid="bd-request">Cheque os campos inseridos</p>}
			{erro.service && <p data-testid="svc-request">Não foi possivel realizar ação tente novamente mais tarde</p>}
		</form>
	);
}; 
export default Form;
