import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import FriendsController from '../controllers/FriendsController';

const friendsRouter = Router();
const upload = multer(uploadConfig.multer);
const friendsController = new FriendsController();

friendsRouter.get('/', friendsController.index);

friendsRouter.get(
  '/:friend_id',
  celebrate({
    [Segments.PARAMS]: {
      friend_id: Joi.string().required(),
    },
  }),
  friendsController.show,
);

friendsRouter.post(
  '/',
  upload.array('images'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      about: Joi.string().required().max(300),
      information: Joi.string().required(),
      personality: Joi.string().required(),
      extra_information: Joi.string().required(),
      phone: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      opening_hours: Joi.string().required(),
      open_on_weekends: Joi.boolean().required(),
    },
  }),
  friendsController.create,
);

export default friendsRouter;
