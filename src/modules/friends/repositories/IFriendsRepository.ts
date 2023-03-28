import Friend from '../infra/typeorm/entities/Friend';

import ICreateFriendDTO from '../dtos/ICreateFriendDTO';

export default interface IFriendsRepository {
  create(data: ICreateFriendDTO): Promise<Friend>;
  findAllFriends(): Promise<Friend[]>;
  findFriendById(id: string): Promise<Friend | undefined>;
}
