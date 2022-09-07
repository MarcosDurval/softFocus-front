import RegisterClient from "../src/pages/RegisterClient";
import { screen, waitFor } from "@testing-library/react";
import {mockPost, failPost, badRequest, conflitPost} from "./__mocks__/status";
import { vi } from "vitest";
import renderWithRouter from "./utils";


afterEach(() => {
	vi.resetAllMocks();
});

describe("Register Page", () => {
	describe("it should render Forms Register", () => {

		test("it should render Input 'name' ", async() => {
			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const name = screen.getByLabelText("Nome:") as HTMLInputElement;
			await user.type(name,"NOME");
			expect(name).toBeTruthy();
			expect(name).toHaveProperty("required");
			expect(name.type).toBe("text");
			expect(name.value).toBe("NOME");
		});

		test("it should render Input 'cpf' ", async() => {
			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const cpf = screen.getByLabelText("CPF:") as HTMLInputElement;
			await user.type(cpf,"12345678911");
			expect(cpf).toBeTruthy();
			expect(cpf).toHaveProperty("required");
			expect(cpf.type).toBe("text");
			expect(cpf.value).toBe("123.456.789-11");
		});

		test("it should render Input 'date'", async() => {
			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const date = screen.getByLabelText("Data da colheita:") as HTMLInputElement;
			await user.type(date,"2000-01-01");
			expect(date).toBeTruthy();
			expect(date).toHaveProperty("required");
			expect(date.type).toBe("date");
			expect(date.value).toBe("2000-01-01");
		});

		test("it should render Input 'email'", async() => {
			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const email = screen.getByLabelText("Email:") as HTMLInputElement;
			await user.type(email,"user@user.com");
			expect(email).toBeTruthy();
			expect(email).toHaveProperty("required");
			expect(email.type).toBe("email");
			expect(email.value).toBe("user@user.com");
		});

		test("it should render select 'event'", async() => {
			renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const eventPossible = ["CHUVA EXCESSIVA", "GEADA", "GRANIZO", "SECA", "VENDAVAL", "RAIO"];
			const event = screen.getByLabelText("Evento ocorrido:") as HTMLInputElement;
			expect(event).toBeTruthy();
			expect(event).toHaveProperty("required");
			const children = Array.from(event.children).map((child) => {
				return child.innerHTML;
			});
			expect(children).toEqual(expect.arrayContaining(eventPossible));
		});

		test("it should render input 'tillage'", async() => {
			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const tillage = screen.getByLabelText("Tipo da lavoura:") as HTMLInputElement;
			await user.type(tillage,"milho");
			expect(tillage).toBeTruthy();
			expect(tillage).toHaveProperty("required");
			expect(tillage.type).toBe("text");
			expect(tillage.value).toBe("milho");
		});

		test("it should render input 'latitude'", async() => {
			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const latitude = screen.getByLabelText("Latitude:") as HTMLInputElement;
			await user.type(latitude,"41.40338");
			expect(latitude).toBeTruthy();
			expect(latitude).toHaveProperty("required");
			expect(latitude.type).toBe("number");
			expect(latitude.value).toBe("41.40338");
		});

		test("it should render input 'longitude'", async() => {
			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const longitude = screen.getByLabelText("Longitude:") as HTMLInputElement;
			await user.type(longitude,"2.17403");
			expect(longitude).toBeTruthy();
			expect(longitude).toHaveProperty("required");
			expect(longitude.type).toBe("number");
			expect(longitude.value).toBe("2.17403");
		});
	});

	describe("Action submit", () => {
		
		test("it should render message 'Email Inválido'",async() => {
			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});

			const name = screen.getByLabelText("Nome:") as HTMLInputElement;
			const cpf = screen.getByLabelText("CPF:") as HTMLInputElement;
			const date = screen.getByLabelText("Data da colheita:") as HTMLInputElement;
			const email = screen.getByLabelText("Email:") as HTMLInputElement;
			const event = screen.getByLabelText("Evento ocorrido:") as HTMLInputElement;
			const tillage = screen.getByLabelText("Tipo da lavoura:") as HTMLInputElement;
			const latitude = screen.getByLabelText("Latitude:") as HTMLInputElement;
			const longitude = screen.getByLabelText("Longitude:") as HTMLInputElement;
			const button = screen.getByText("Enviar") as HTMLInputElement;
			email.type = "text";
			await user.type(name,"NOME");
			await user.type(cpf,"11815684984"); // cpf gerado aleatoriamente apenas para executar os testes
			await user.type(date,"2000-01-01");
			await user.type(email,"useruser.com");
			await user.type(event,"2");
			await user.type(tillage,"milho");
			await user.type(latitude,"41.40338");
			await user.type(longitude,"2.17403");
			await user.click(button);

			const faillEmail = await screen.findByTestId("fail-email");

			expect(faillEmail).toBeTruthy();
			expect(faillEmail.innerHTML).toBe("Email Inválido");

		});

		test("it should render message CPF Inválido",async() => {

			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});

			const name = screen.getByLabelText("Nome:") as HTMLInputElement;
			const cpf = screen.getByLabelText("CPF:") as HTMLInputElement;
			const date = screen.getByLabelText("Data da colheita:") as HTMLInputElement;
			const email = screen.getByLabelText("Email:") as HTMLInputElement;
			const event = screen.getByLabelText("Evento ocorrido:") as HTMLInputElement;
			const tillage = screen.getByLabelText("Tipo da lavoura:") as HTMLInputElement;
			const latitude = screen.getByLabelText("Latitude:") as HTMLInputElement;
			const longitude = screen.getByLabelText("Longitude:") as HTMLInputElement;
			const button = screen.getByText("Enviar") as HTMLInputElement;

			await user.type(name,"NOME");
			await user.type(cpf,"00000000000");
			await user.type(date,"2000-01-01");
			await user.type(email,"user@user.com");
			await user.type(event,"2");
			await user.type(tillage,"milho");
			await user.type(latitude,"41.40338");
			await user.type(longitude,"2.17403");
			await user.click(button);

			const faillCpf = await screen.findByTestId("fail-cpf");
			expect(faillCpf).toBeTruthy();
			expect(faillCpf.innerHTML).toBe("CPF Inválido");
		});
	});

	describe("New client", () => {
		
		test("it should redirect to=/clients/new", async() => {

			vi.stubGlobal("fetch",mockPost);

			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});

			const name = screen.getByLabelText("Nome:") as HTMLInputElement;
			const cpf = screen.getByLabelText("CPF:") as HTMLInputElement;
			const date = screen.getByLabelText("Data da colheita:") as HTMLInputElement;
			const email = screen.getByLabelText("Email:") as HTMLInputElement;
			const event = screen.getByLabelText("Evento ocorrido:") as HTMLInputElement;
			const tillage = screen.getByLabelText("Tipo da lavoura:") as HTMLInputElement;
			const latitude = screen.getByLabelText("Latitude:") as HTMLInputElement;
			const longitude = screen.getByLabelText("Longitude:") as HTMLInputElement;
			const button = screen.getByText("Enviar") as HTMLInputElement;

			await user.type(name,"NOME");
			await user.type(cpf,"11815684984"); // cpf gerado aleatoriamente apenas para executar os testes
			await user.type(date,"2000-01-01");
			await user.type(email,"user@user.com");
			await user.type(event,"2");
			await user.type(tillage,"milho");
			await user.type(latitude,"41.40338");
			await user.type(longitude,"2.17403");
			await user.click(button);

			await waitFor(() => {
				expect(window.location.pathname).toBe("/clients");
			});
		});

		test("it should render Modal", async() => {

			vi.stubGlobal("fetch",conflitPost);

			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const name = screen.getByLabelText("Nome:") as HTMLInputElement;
			const cpf = screen.getByLabelText("CPF:") as HTMLInputElement;
			const date = screen.getByLabelText("Data da colheita:") as HTMLInputElement;
			const email = screen.getByLabelText("Email:") as HTMLInputElement;
			const event = screen.getByLabelText("Evento ocorrido:") as HTMLInputElement;
			const tillage = screen.getByLabelText("Tipo da lavoura:") as HTMLInputElement;
			const latitude = screen.getByLabelText("Latitude:") as HTMLInputElement;
			const longitude = screen.getByLabelText("Longitude:") as HTMLInputElement;
			const button = screen.getByText("Enviar") as HTMLInputElement;

			await user.type(name,"NOME");
			await user.type(cpf,"11815684984"); // cpf gerado aleatoriamente apenas para executar os testes
			await user.type(date,"2000-01-01");
			await user.type(email,"user@user.com");
			await user.type(event,"2");
			await user.type(tillage,"milho");
			await user.type(latitude,"41.40338");
			await user.type(longitude,"2.17403");
			await user.click(button);

			const btnClosed = await screen.findByTestId("closedModal");

			expect(btnClosed).toBeTruthy();
		});

		test("it should render message 'Cheque os campos'", async() => {

			vi.stubGlobal("fetch",badRequest);

			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const name = screen.getByLabelText("Nome:") as HTMLInputElement;
			const cpf = screen.getByLabelText("CPF:") as HTMLInputElement;
			const date = screen.getByLabelText("Data da colheita:") as HTMLInputElement;
			const email = screen.getByLabelText("Email:") as HTMLInputElement;
			const event = screen.getByLabelText("Evento ocorrido:") as HTMLInputElement;
			const tillage = screen.getByLabelText("Tipo da lavoura:") as HTMLInputElement;
			const latitude = screen.getByLabelText("Latitude:") as HTMLInputElement;
			const longitude = screen.getByLabelText("Longitude:") as HTMLInputElement;
			const button = screen.getByText("Enviar") as HTMLInputElement;

			await user.type(name,"NOME");
			await user.type(cpf,"11815684984"); // cpf gerado aleatoriamente apenas para executar os testes
			await user.type(date,"2000-01-01");
			await user.type(email,"user@user.com");
			await user.type(event,"2");
			await user.type(tillage,"milho");
			await user.type(latitude,"41.40338");
			await user.type(longitude,"2.17403");
			await user.click(button);
			
			const textBad = await screen.findByTestId("bd-request");
			expect(textBad).toBeTruthy();
			expect(textBad.innerHTML).toMatch(/^Cheque os campos/i);
		});

		test("it should render message 'não foi possivel'", async() => {

			vi.stubGlobal("fetch",failPost);

			const {user} = renderWithRouter(<RegisterClient/>, {route:"/clients/new"});
			const name = screen.getByLabelText("Nome:") as HTMLInputElement;
			const cpf = screen.getByLabelText("CPF:") as HTMLInputElement;
			const date = screen.getByLabelText("Data da colheita:") as HTMLInputElement;
			const email = screen.getByLabelText("Email:") as HTMLInputElement;
			const event = screen.getByLabelText("Evento ocorrido:") as HTMLInputElement;
			const tillage = screen.getByLabelText("Tipo da lavoura:") as HTMLInputElement;
			const latitude = screen.getByLabelText("Latitude:") as HTMLInputElement;
			const longitude = screen.getByLabelText("Longitude:") as HTMLInputElement;
			const button = screen.getByText("Enviar") as HTMLInputElement;

			await user.type(name,"NOME");
			await user.type(cpf,"11815684984"); // cpf gerado aleatoriamente apenas para executar os testes
			await user.type(date,"2000-01-01");
			await user.type(email,"user@user.com");
			await user.type(event,"2");
			await user.type(tillage,"milho");
			await user.type(latitude,"41.40338");
			await user.type(longitude,"2.17403");
			await user.click(button);
			
			const textSvc = await screen.findByTestId("svc-request");
			expect(textSvc).toBeTruthy();
			expect(textSvc.innerHTML).toMatch(/^não foi possivel/i);			
		});
	});
});
