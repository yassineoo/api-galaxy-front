import {Errors} from "../types/common.types"
export const validatePassword = (password:string,confirmedPassword:string) => {
    const errors = {} as Errors;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      errors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.';
    }

    if (password !== confirmedPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  };