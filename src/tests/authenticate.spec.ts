import { beforeEach, describe, expect, it } from 'vitest';
import {  hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456',6),
    });
  });

  it('should be able to authenticate', async () => {



    const { user } = await sut.execute({
      email: 'john.doe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    expect(() => sut.execute({
      email: 'john.doe@example.com',
      password: '12356',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should be able to authenticate with wrong password', async () => {

    expect(() => sut.execute({
      email: 'john.doe@example.com',
      password: '123',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  
});
