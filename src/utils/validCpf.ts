// codigo feito com base no codigo fornecido pela receita federal http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
const isValidCpf = (cpf:string) => {
	let soma = 0;
	let resto = 0;
	const clearMask = cpf.replace(/\D/g, "");
	if (clearMask == "00000000000" || clearMask.length != 11){
		return false;
	}
	const arrayNineNumber = clearMask.split("").slice(0,9);
	soma = arrayNineNumber.reduce((prev,curr,index) => prev + (parseInt(curr) * (11 - (index + 1))) ,0);
	resto = (soma * 10) % 11;
	if ((resto === 10) || (resto === 11)) 
		resto = 0;
	if (resto !== parseInt(clearMask.slice(9,10))){
		return false;
	}
	const arrayTeenNumber = clearMask.split("").slice(0,10);
	soma = arrayTeenNumber.reduce((prev,curr,index) => prev +  (parseInt(curr) * (12 - (index + 1))) ,0);
	resto = (soma * 10) % 11;
	if ((resto === 10) || (resto === 11)) 
		resto = 0;
	if (resto !== parseInt(clearMask.slice(10,11))){
		return false;
	}
	return true;
};

export default isValidCpf;
