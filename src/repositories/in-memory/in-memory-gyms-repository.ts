import { Gym, Prisma } from '@prisma/client';
import { GymsRepository } from '../gyms-repository';
import { randomUUID } from 'crypto';

export class InMemoryGymsRepository implements GymsRepository {

  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: new Prisma.Decimal(Number(data.latitude)) ,
      longitude: new Prisma.Decimal(Number(data.longitude)),
      created_at: new Date(),
    } as Gym;

    this.items.push(gym);

    return gym;
  }
  async findById(id: string){
    const user = this.items.find((item) => item.id === id) as Gym;

    if (!user) return null;

    return user;
  }
}
