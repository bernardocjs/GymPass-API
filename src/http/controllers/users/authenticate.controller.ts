import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });

  const {  email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    const {user} =await authenticateUseCase.execute({
      email,
      password,
    });

    const token = reply.jwtSign({},{sub: user.id});

    return reply.status(200).send({token});
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return reply.status(400).send({ message: err.message });
    throw err;
  }
}
