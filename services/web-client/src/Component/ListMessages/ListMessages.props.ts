import {IMessage} from "../../types/index"

export interface ListMessagesProps {
  messages: IMessage[];
  userId: string;
}
