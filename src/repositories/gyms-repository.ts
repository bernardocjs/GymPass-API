import { Prisma, Gym } from '@prisma/client';
export interface FindManyNearbyGymsParams {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
    findManyNearby(params: FindManyNearbyGymsParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
}