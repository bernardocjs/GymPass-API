import { z } from 'zod';
import {FastifyRequest, FastifyReply } from 'fastify';
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';

export async function searchGym(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  });

  const {query, page} = searchGymQuerySchema.parse(request.body);
  
  const searchGymUseCase = makeSearchGymsUseCase();

  await searchGymUseCase.execute(
    {
      query,
      page
    }
  );

  reply.status(201).send();
}
