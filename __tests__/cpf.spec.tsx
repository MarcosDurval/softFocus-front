import isValidCpf from "../src/utils/validCpf";


describe(("check isValidCpf"), ()=> {
	test("it should return False", () => {
		expect(isValidCpf("abcdefghijklmnopq")).toBe(false); 
		expect(isValidCpf("12345678911")).toBe(false);
		expect(isValidCpf("1234")).toBe(false);
	});
	test("it should return True", () => {
		expect(isValidCpf("11815684984")).toBe(true); // cpf gerado aleatoriamente apenas para executar os testes

	});
});