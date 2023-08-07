import { Gym, Prisma } from '@prisma/client';
import { GymsRepository, FindManyNearbyGymsParams } from '../gyms-repository';
import { randomUUID } from 'crypto';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

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

  async findManyNearby(params: FindManyNearbyGymsParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      );

      return distance < 10;
    });
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }
  async findById(id: string){
    const user = this.items.find((item) => item.id === id) as Gym;

    if (!user) return null;

    return user;
  }
}
