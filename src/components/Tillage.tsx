const Tillage = ({handleChange, type_tillage}:Change) => {
	return(
		<label htmlFor="tillage">
      Tipo da lavoura:
			<input
				id="tillage"
				type="text"
				onChange={(e) => handleChange(e.target)}
				value={type_tillage || ""}
				name="type_tillage"
				placeholder="ex: milho"
				required
			/>
		</label>
	);
};

export default Tillage;
