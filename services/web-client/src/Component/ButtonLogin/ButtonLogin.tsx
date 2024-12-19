import React from "react";
import cn from "classnames";
import { ButtonLoginProps, ButtonAppearence } from "./ButtonLogin.props"; // Убедитесь, что ButtonAppearence импортирован
import styles from "./ButtonLogin.module.scss";

const ButtonLogin: React.FC<ButtonLoginProps> = ({
  children,
  appearence = ButtonAppearence.Join, // Используем enum
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(styles.bth, className, {
        [styles.join]: appearence === ButtonAppearence.Join,
        [styles.back]: appearence === ButtonAppearence.Back,
      })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonLogin;
