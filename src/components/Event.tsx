const Event = ({handleChange, event}:Change) => {
	const eventPossible = ["CHUVA EXCESSIVA", "GEADA", "GRANIZO", "SECA", "VENDAVAL", "RAIO"];
	return(
		<label htmlFor="event">
      Evento ocorrido:
			<select onChange={(e) => handleChange(e.target)} name="event" defaultValue={event || ""} id="event" required>
				{eventPossible.map((value, index) => {
					return(
						<option 
							key={index} 
							value={index + 1}>
							{value}</option>
					);
				})}
			</select>
		</label>
	);
};

export default Event;
