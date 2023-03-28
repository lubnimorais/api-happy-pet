import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Expose, Exclude } from 'class-transformer';
import uploadConfig from '@config/upload';

import ImageFriend from './ImageFriend';

// Interface para retornar os dados das imagens de forma correta para o front-end
interface IImageFriendView {
  id: string | null;
  image: string | null;
}

@Entity('friends')
class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  about: string;

  @Column()
  information: string;

  @Column()
  personality: string;

  @Column()
  extra_information: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  phone: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  enable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Para o relacionamente das imagens com a entidade friend
  @OneToMany(() => ImageFriend, imageFriend => imageFriend.friend, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'friend_id' })
  @Exclude()
  imagesFriend: ImageFriend[];

  // MÉTODO PARA RETORNAR DE FORMA FORMATADA AS IMAGENS PARA O FRONT-END
  @Expose({ name: 'images_friend_url' })
  getImageFriendUrl(): IImageFriendView[] | [] {
    if (this.imagesFriend.length > 0) {
      const images = this.imagesFriend.map(imageFriend => {
        switch (uploadConfig.driver) {
          case 'disk':
            return {
              id: imageFriend.id,
              image: `${process.env.APP_API_URL}/files/${imageFriend.image}`,
            };
          default:
            return { id: null, image: null };
        }
      });

      return images;
    }

    return [];
  }
}

export default Friend;
