
interface GenericInput extends ChangeGeneric{
  name:string
  type: string
  label: string
  value: string | number
	placeholder?: string
}

const InputGeneric = ({handleChange, name, type, label, value, placeholder}:GenericInput) => {
	return(
		<label htmlFor={name}>
			{`${label}:`}
			<input
				id={name}
				type={type}
				onChange={(e) => handleChange(e.target)}
				value={value || ""}
				name={name}
				placeholder={placeholder}
				required
			/>
		</label>
	);
};

export default InputGeneric;
