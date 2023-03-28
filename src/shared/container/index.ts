import { container } from 'tsyringe';

import './provider';

import IFriendsRepository from '@modules/friends/repositories/IFriendsRepository';
import FriendsRepository from '@modules/friends/infra/typeorm/repositories/FriendsRepository';

container.registerSingleton<IFriendsRepository>(
  'FriendsRepository',
  FriendsRepository,
);
