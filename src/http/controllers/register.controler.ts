import { z } from 'zod';
import {FastifyRequest, FastifyReply } from 'fastify';
import { RegisterUseCase } from '@/use-cases/register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().max(50),
    email: z.string().email(),
    password: z.string().min(4),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
  
  try{
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
 
    await registerUseCase.execute({
      name,
      email,
      password,
    });
  }catch(err) {
    reply.status(400).send();
  }

  reply.status(201).send();
}
