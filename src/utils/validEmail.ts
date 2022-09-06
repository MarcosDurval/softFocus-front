/* eslint-disable no-useless-escape */
const isValidEmail = (email:string) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

export default isValidEmail;
