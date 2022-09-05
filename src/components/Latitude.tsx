
const Latitude = ({handleChange, latitude}:Change) => {
	return(
		<label htmlFor="latitude">
      Latitude:
			<input
				id="latitude"
				type="number"
				onChange={(e) => handleChange(e.target)}
				value={latitude || ""}
				name="latitude"
				placeholder="ex: -26.198338"
				required
			/>
		</label>
	);
};

export default Latitude;