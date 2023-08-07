import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length;
  }


  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('day');
    const endOfTheDay = dayjs(date).endOf('day');
    
    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return (checkIn.user_id === userId) && isOnSameDate;
    });

    
    if (!checkInOnSameDate) return null;

    return checkInOnSameDate;
  }
}
