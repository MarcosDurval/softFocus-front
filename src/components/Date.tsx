const Date = ({handleChange, date}:Change) => {
	return(
		<label htmlFor="date">
    Data da colheita:
			<input
				id="date"
				type="date"
				onChange={(e) => handleChange(e.target)}
				value={date || ""}
				name="date"
				required
			/>
		</label>
	);
};

export default Date;
