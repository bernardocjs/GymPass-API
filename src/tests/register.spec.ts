import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from '../use-cases/register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '../use-cases/errors/invalid-credentials-error';

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
 
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456'
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not allow two users with the same email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456'
    });

    await expect(() => registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError);
  
  });
});