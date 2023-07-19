import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {

  constructor(
        private readonly checkInsRepository: CheckInsRepository
  ) {}
  
  async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date
    );

    if (checkInOnSameDate) {
      throw new Error('Check in already registered on this date');
    }
    
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    });
 
    return {
      checkIn
    };
  }
}