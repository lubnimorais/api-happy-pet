import { Repository, getRepository } from 'typeorm';

import IFriendsRepository from '@modules/friends/repositories/IFriendsRepository';
import ICreateFriendDTO from '@modules/friends/dtos/ICreateFriendDTO';
import Friend from '../entities/Friend';

class FriendsRepository implements IFriendsRepository {
  private ormRepository: Repository<Friend>;

  constructor() {
    this.ormRepository = getRepository(Friend);
  }

  public async create(friendData: ICreateFriendDTO): Promise<Friend> {
    const friend = this.ormRepository.create(friendData);

    await this.ormRepository.save(friend);

    return friend;
  }

  public async findAllFriends(): Promise<Friend[]> {
    // relations: é o nome da coluna da entidade que tem as imagens
    const friends = await this.ormRepository.find({
      where: { enable: true },
      relations: ['imagesFriend'],
    });

    return friends;
  }

  public async findFriendById(id: string): Promise<Friend | undefined> {
    const friend = await this.ormRepository.findOne(id, {
      relations: ['imagesFriend'],
    });

    return friend;
  }
}

export default FriendsRepository;
