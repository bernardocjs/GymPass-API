import { z } from 'zod';
import {FastifyRequest, FastifyReply } from 'fastify';
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const CreateGymBodySchema = z.object({
    title: z.string().max(50),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return value >= -90 && value <= 90;
    }),
    longitude: z.number().refine(value => {
      return value >= -180 && value <= 180;
    })
  });

  const gym = CreateGymBodySchema.parse(request.body);
  
  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute(
    gym
  );

  reply.status(201).send();
}
