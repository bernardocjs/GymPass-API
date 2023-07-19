import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';
import { randomUUID } from 'crypto';
import { afterEach } from 'vitest';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('CheckIn Use Case', () => {

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to authenticate', async () => {

    const checkIn = await checkInsRepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID()
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should be able to check in twice but in different days', async () => {
      
    vi.setSystemTime(new Date(2022,1, 20, 9, 0, 0));
  
    await sut.execute({
      gymId: randomUUID(),
      userId: '1234'
    });

    vi.setSystemTime(new Date(2022,1, 21, 9, 0, 0));
  
    const {checkIn} = await sut.execute({
      gymId: randomUUID(),
      userId: '1234'
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
      
    vi.setSystemTime(new Date(2022,1, 20, 9, 0, 0));
  
    await sut.execute({
      gymId: randomUUID(),
      userId: '1234'
    });
  
    await expect(() => sut.execute({
      gymId: randomUUID(),
      userId: '1234'
    })).rejects.toBeInstanceOf(Error);
  });
});
