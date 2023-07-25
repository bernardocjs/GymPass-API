import { Gym, Prisma } from '@prisma/client';
import { GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {

  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    return this.items[1];
  }
  async findById(id: string){
    const user = this.items.find((item) => item.id === id) as Gym;

    if (!user) return null;

    return user;
  }
}
