interface ResponseListClient {
	data: Client[] | []
	status: number
}

const URL:string = import.meta.env.VITE_API_URL;

const options = (metodo= "GET") => ({
	method:metodo,
	headers: {
		Accept: "application/json",
		"Content-type": "application/json",
	},
});

export const registerClient = async (client:InputClient) => {
	const response = await fetch(URL,{
		...options("POST"),
		body: JSON.stringify(client)
	});
	const data = await response.json();
	return {data, status:response.status };
};

export const listClients = async():Promise<ResponseListClient> => {
	const response = await fetch(URL);
	const data = await response.json() as unknown as Client[] | [];
	return {data, status: response.status};
};

export const getClientById = async(id:string) => {
	const response = await fetch(`${URL}${id}/`,{...options});
	const data = await response.json() as unknown as InputClient;
	return {data, status: response.status};
};

export const deleteCLient = async(id:string) => {
	await fetch(`${URL}${id}/`,{
		...options("DELETE")
	});
	return;
};


export const updateClient = async(id:string, client:InputClient) => {
	const response = await fetch(`${URL}${id}/`,{
		...options("PUT"),
		body: JSON.stringify(client)
	});

	const data = await response.json();
	return {data, status:response.status };
};
