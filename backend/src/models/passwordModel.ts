import prisma from "../config/db";

export const saveGeneratedPassword = async (userId: string, password: string, description: string) => {
  return await prisma.passwordHistory.create({
    data: { userId, password, description },
  });
};

export const getUserPasswords = async (userId: string) => {
  return await prisma.passwordHistory.findMany({ where: { userId } });
};
