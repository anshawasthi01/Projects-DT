//* Validates user's name. Rules: Nmae must be at leat 3 character long
const validateName = (name) => {
    const nameRegex = new RegExp(/[a-zA-Z][a-zA-Z]+[a-zA-Z]$/)
    return nameRegex.test(name); //* checks whether we entered name matches
  }
  
//* Validates user's email.
  const validateEmail = (email) => {
    const reg = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  
    return reg.test(email);  //* checks whether the entered email 
  }
  

  const validatePassword = (password) => {
    const passwordRegex = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    );
    return passwordRegex.test(password); 
  }
  
  module.exports = {
    validatePassword,
    validateEmail,
    validateName
  }