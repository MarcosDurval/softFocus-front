
const Email = ({handleChange, email}:Change) => {
	return(
		<label htmlFor="email">
      Email:
			<input
				id="email"
				type="email"
				onChange={(e) => handleChange(e.target)}
				value={email || ""}
				name="email"
				required
			/>
		</label>
	);
};

export default Email;