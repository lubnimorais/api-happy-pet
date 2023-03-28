import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFriendsRepository from '../repositories/IFriendsRepository';
import Friend from '../infra/typeorm/entities/Friend';

interface IRequest {
  friend_id: string;
}

@injectable()
class ShowFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,
  ) {}

  public async execute({ friend_id }: IRequest): Promise<Friend> {
    const friend = await this.friendsRepository.findFriendById(friend_id);

    if (!friend) {
      throw new AppError('Friend not found');
    }

    return friend;
  }
}

export default ShowFriendService;
