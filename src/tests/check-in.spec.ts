import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';
import { randomUUID } from 'crypto';
import { afterEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('CheckIn Use Case', () => {

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);
  
    gymsRepository.items.push({
      id: 'teste',
      title: 'Academia',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      description: '',
      phone: ''
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to checkIn', async () => {

    const {checkIn} = await sut.execute({
      gymId: 'teste',
      userId: randomUUID(),
      userLatitude:0,
      userLongitude:0
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should be able to check in twice but in different days', async () => {
      
    vi.setSystemTime(new Date(2022,1, 20, 9, 0, 0));
  
    await sut.execute({
      gymId: 'teste',
      userId: '1234',
      userLatitude:0,
      userLongitude:0
    });

    vi.setSystemTime(new Date(2022,1, 21, 9, 0, 0));
  
    const {checkIn} = await sut.execute({
      gymId:  'teste',
      userId: '1234',
      userLatitude:0,
      userLongitude:0
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
      
    vi.setSystemTime(new Date(2022,1, 20, 9, 0, 0));
  
    await sut.execute({
      gymId:  'teste',
      userId: '1234',
      userLatitude:0,
      userLongitude:0
    });
  
    await expect(() => sut.execute({
      gymId:  'teste',
      userId: '1234',
      userLatitude:0,
      userLongitude:0
    })).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to check in in distant gym', async () => {
        

    gymsRepository.items.push({
      id: 'teste2',
      title: 'Academia',
      latitude: new Decimal(25),
      longitude: new Decimal(25),
      description: '',
      phone: ''
    });
  
    await expect(() => sut.execute({
      gymId:  'teste2',
      userId: '1234',
      userLatitude:0,
      userLongitude:0
    })).rejects.toBeInstanceOf(Error);
  });
});
