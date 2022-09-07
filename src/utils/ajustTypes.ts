
const convertClient = (client:SendInputClient):InputClient => {
	return(
		{
			...client,
			cpf: client.cpf?.replace(/\D/g,"") || "",
			event: parseInt(client?.event as string),
			latitude: parseFloat(client?.latitude as string),
			longitude: parseFloat(client?.longitude as string),
		}
	);
};

export default convertClient;
