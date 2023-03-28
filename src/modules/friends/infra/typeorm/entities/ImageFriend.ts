import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Friend from './Friend';

@Entity('images_friend')
class ImageFriend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @ManyToOne(() => Friend, friend => friend.imagesFriend)
  @JoinColumn({ name: 'friend_id' })
  friend: Friend;
}

export default ImageFriend;
