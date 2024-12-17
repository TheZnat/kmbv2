import React from "react";
import cn from "classnames";
import { ButtonLoginProps } from "./ButtonLogin.props";
import styles from "./ButtonLogin.module.scss";

const ButtonLogin: React.FC<ButtonLoginProps> = ({
  children,
  appearence = "join",
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(styles.bth, className, {
        [styles.join]: appearence === "join",
        [styles.back]: appearence === "back",
      })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonLogin;
