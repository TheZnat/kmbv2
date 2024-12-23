import React from "react";
import cn from "classnames";
import styles from "./buttonChat.module.scss";
import ChatIconDisabled from "../../assets/chat/chat-disable.svg";
import ChatIconEnable from "../../assets/chat/chat-enable.svg";
import { IChatToggleButtonProps } from "./ButtonChat.props";

const ButtonChat: React.FC<IChatToggleButtonProps> = ({
  toggleChatVisibility,
  isChatVisible,
}) => {
  return (
    <button
      type="button"
      onClick={toggleChatVisibility}
      className={cn(styles.buttonChat, {
        [styles.buttonChatEnable]: isChatVisible,
        [styles.buttonChatDisabled]: !isChatVisible,
      })}
    >
      <img
        alt={isChatVisible ? "Disable chat" : "Enable chat"}
        src={isChatVisible ? ChatIconEnable : ChatIconDisabled}
      />
    </button>
  );
};

export default ButtonChat;
