import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymUseCase } from '@/use-cases/create-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;
describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymsRepository);

  });

  it('should be able to create Gym', async () => {

    const { gym } = await createGymUseCase.execute({
      title: 'adacemia1',
      description: 'academia1',
      phone: '123456789',
      latitude: 123456789,
      longitude: 123456789
    });

    expect(gym.id).toEqual(expect.any(String));
  });

});