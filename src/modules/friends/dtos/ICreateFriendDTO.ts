type IImageFriend = Array<{
  image: string;
}>;

export default interface ICreateFriendDTO {
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
  imagesFriend: IImageFriend;
}
