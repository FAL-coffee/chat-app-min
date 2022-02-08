import { IChatRoom } from "@types";
export interface Props {
  chatRoom: IChatRoom;
  onClick: (uid: string) => void;
  onTagClick: (genreId:string,id: string) => void;
}
