import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/provider/StorageProvider/models/IStorageProvider';

import IFriendsRepository from '../repositories/IFriendsRepository';
import Friend from '../infra/typeorm/entities/Friend';

type IRequesImageFriend = Array<{
  image: string;
}>;

interface IRequest {
  name: string;
  about: string;
  information: string;
  personality: string;
  extra_information: string;
  phone: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  open_on_weekends: boolean;
  imagesFriend: IRequesImageFriend;
}

@injectable()
class CreateFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendRepository: IFriendsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    about,
    information,
    personality,
    extra_information,
    phone,
    latitude,
    longitude,
    opening_hours,
    open_on_weekends,
    imagesFriend,
  }: IRequest): Promise<Friend> {
    // Move os arquivos das imagens da pasta tmp para dentro da pasta uploads
    imagesFriend.map(async imageFriend => {
      await this.storageProvider.saveFile(imageFriend.image);
    });

    const friend = await this.friendRepository.create({
      name,
      about,
      information,
      personality,
      extra_information,
      phone,
      latitude,
      longitude,
      opening_hours,
      open_on_weekends,
      imagesFriend,
    });

    return friend;
  }
}

export default CreateFriendService;
