import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from '../use-cases/register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;
describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);

  });

  it('should be able to register', async () => {

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash password upon registration', async () => {

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