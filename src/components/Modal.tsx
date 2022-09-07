import { Dispatch, SetStateAction } from "react";

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>
}

const Modal = ({setModal}:Props) => {

	const closedModal = () => {
		setModal(false);
	};

	return(
		<div className="modal">
			<div className="container">
				<p>O Evento diverge de um evento já informado</p>
				<button onClick={closedModal} data-testid="closedModal">ok</button>
			</div>
		</div>
	);
};

export default Modal;
