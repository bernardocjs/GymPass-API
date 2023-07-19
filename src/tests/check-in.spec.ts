import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';
import { randomUUID } from 'crypto';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it('should be able to authenticate', async () => {

    const checkIn = await checkInsRepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID()
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
