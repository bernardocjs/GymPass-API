import {FastifyInstance } from 'fastify';

import { verifyJWT } from '../../middlewares/verify-jwt';
import { searchGym } from './search-gym.controller';
import { nearbyGym } from './nearby-gym.controller';
import { createGym } from './create-gym.controller';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/gyms/search', searchGym);
  app.get('/gyms/nearby', nearbyGym);
  app.post('/gyms', createGym);
}