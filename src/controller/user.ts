import {Context} from 'koa';
import {getManager} from 'typeorm';
import {User} from '../entity/User';

export const createUser = async (context: Context) => {
  const userRepository = getManager().getRepository(User);
  const newUser = userRepository.create({
    username: `burt${Math.random() * 10}`.slice(0, 9),
    password: '123456',
    email: `${Math.random() * 10}@163.com`
  });
  await userRepository.save(newUser);

  context.body = newUser;
};
