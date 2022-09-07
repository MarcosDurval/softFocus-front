const Name = ({handleChange, name}:Change) => {
	return(
		<label htmlFor="name">
      Nome:
			<input
				id="name"
				type="text"
				onChange={(e) => handleChange(e.target)}
				value={name || ""}
				name="name"
				required
			/>
		</label>
	);
};

export default Name;
