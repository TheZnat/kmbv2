import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export enum ButtonAppearence {
  Join = "join",
  Back = "back",
}

export interface ButtonLoginProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appearence: ButtonAppearence;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
