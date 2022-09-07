const Cpf = ({handleChange, cpf}:Change) => {
	return(
		<label htmlFor="cpf">
      CPF:
			<input
				id="cpf"
				name="cpf"
				value={cpf || ""}
				onChange={(e) => handleChange(e.target)}
				required
			/>
		</label>
	);
};

export default Cpf;
