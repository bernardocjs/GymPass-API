import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface IRegisterUseCaseParams {
    name: string,
    email: string,
    password: string,
}

export async function registerUseCase({name, email, password}: IRegisterUseCaseParams) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('Email already exists');
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}