import { z } from 'zod';
import {FastifyRequest, FastifyReply } from 'fastify';
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';

export async function nearbyGym(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine(value => {
      return value >= -90 && value <= 90;
    }),
    longitude: z.number().refine(value => {
      return value >= -180 && value <= 180;
    })
  });

  const {latitude, longitude} = nearbyGymsQuerySchema.parse(request.body);
  
  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  await fetchNearbyGymsUseCase.execute(
    {
      userLatitude: latitude,
      userLongitude: longitude
    }
  );

  reply.status(201).send();
}
