import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFriendService from '@modules/friends/services/CreateFriendService';
import ListFriendsService from '@modules/friends/services/ListAllFriendsService';
import ShowFriendService from '@modules/friends/services/ShowFriendService';

class FriendsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listFriendsService = container.resolve(ListFriendsService);

    const friends = await listFriendsService.execute();

    return response.status(200).json(classToClass(friends));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createFriendService = container.resolve(CreateFriendService);

    // Hack para quando for lidar com upload de múltiplos arquivos
    const requestImages = request.files as Express.Multer.File[];
    const imagesFriend = requestImages.map(img => {
      return { image: img.filename };
    });

    const friend = await createFriendService.execute({
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

    return response.status(201).json(classToClass(friend));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { friend_id } = request.params;

    const showFriendService = container.resolve(ShowFriendService);

    const friend = await showFriendService.execute({ friend_id });

    return response.status(200).json(classToClass(friend));
  }
}

export default FriendsController;
