import * as bcrypt from "bcryptjs";

const comparePassword = async (
  plaintextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plaintextPassword, hashedPassword);
};

export { comparePassword };
