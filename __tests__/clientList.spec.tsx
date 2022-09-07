import { screen, waitFor } from "@testing-library/react";
import renderWithRouter from "./utils";
import { vi } from "vitest";

import ListClient from "../src/pages/ListClient";

import { clients } from "./__mocks__/clients";


afterEach(() => {
	vi.resetAllMocks();
});

export const getClients = async() => ({
	json: vi.fn().mockResolvedValue(clients),
	status: 409
});

describe("Client",() => {
	describe("Page CLient", () => {
		test("it should render component Client", async() => {
			vi.stubGlobal("fetch", getClients);

			renderWithRouter(<ListClient />, {route: "/clients"});
			
			const name = await screen.findAllByText(/person$/);
			const email = await screen.findAllByText(/user@user.com$/);
			const event = await screen.findAllByText(/chuva Excessiva$/i);
			const cpf = await screen.findAllByText(/118.156.849-84$/);
			const type_tillage =  await screen.findAllByText(/milho$/);
			const date = await screen.findAllByText(/9 de setembro de 2022$/);
			const latitude = await screen.findAllByText(/-8.124245$/);
			const longitude = await screen.findAllByText(/-179.301121$/);

			expect(name).toBeTruthy();
			expect(email).toBeTruthy();
			expect(event).toBeTruthy();
			expect(cpf).toBeTruthy();
			expect(type_tillage).toBeTruthy();
			expect(date).toBeTruthy();
			expect(latitude).toBeTruthy();
			expect(longitude).toBeTruthy();
		});
	});

	test("it should redirect /clients/edit", async() => {
		vi.stubGlobal("fetch", getClients);

		const {user} = renderWithRouter(<ListClient />, {route: "/clients"});
		
		const btnEdit = await screen.findAllByText("Editar");

		user.click(btnEdit[0]);

		await waitFor(() => {
			expect(window.location.pathname).toBe("/clients/edit/1"); 
		});
	});

	// test("it should delete", async() => {
	// 	vi.stubGlobal("fetch", getClients);

	// 	const {user} = renderWithRouter(<ListClient />, {route: "/clients"});
		
	// 	const btnDelete = await screen.findAllByText("Deletar");

	// 	await user.click(btnDelete[0]);

	// });

	test("it should filtre client", async() => {
		vi.stubGlobal("fetch", getClients);

		const {user} = renderWithRouter(<ListClient />, {route: "/clients"});
		
		const search = await screen.findByLabelText(/^Procurar/i);

		const clientAll = await screen.findAllByText(/person$/i);
		
		expect(clientAll.length).toBe(4);

		await user.type(search, "29614430249"); // cpf gerado aleatoriamente apenas para executar os testes

		const client = await screen.findAllByText(/person$/i);
		
		expect(client.length).toBe(1);
	});
});