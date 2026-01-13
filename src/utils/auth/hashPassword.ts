import * as bcrypt from "bcryptjs";

const saltRounds = 10;

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export { hashPassword };
