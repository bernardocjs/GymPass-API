import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { hash } from 'bcryptjs';
import {FastifyRequest, FastifyReply } from 'fastify';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().max(50),
    email: z.string().email(),
    password: z.string().min(4),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);



  reply.status(201).send();
}
