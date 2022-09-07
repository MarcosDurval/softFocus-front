const Longitude = ({handleChange, longitude}:Change) => {
	return(
		<label htmlFor="longitude">
      Longitude:
			<input
				id="longitude"
				type="number"
				onChange={(e) => handleChange(e.target)}
				value={longitude || ""}
				name="longitude"
				placeholder="ex: -52.692396"
				required
			/>
		</label>
	);
};

export default Longitude;
