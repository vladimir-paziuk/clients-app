import * as bcrypt from 'bcrypt';

export const cryptHashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const cryptComparePasswords = async (
  pass1: string,
  pass2: string,
): Promise<boolean> => {
  return await bcrypt.compare(pass1, pass2);
};
