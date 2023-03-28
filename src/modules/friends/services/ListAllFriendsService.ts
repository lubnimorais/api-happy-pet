import { injectable, inject } from 'tsyringe';

import IFriendsRepository from '../repositories/IFriendsRepository';
import Friend from '../infra/typeorm/entities/Friend';

@injectable()
class ListAllFriendsService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,
  ) {}

  public async execute(): Promise<Friend[]> {
    const friends = await this.friendsRepository.findAllFriends();

    return friends;
  }
}

export default ListAllFriendsService;
