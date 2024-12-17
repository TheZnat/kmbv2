import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export interface ButtonLoginProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    appearence: "join" | "back";
    onClick?: MouseEventHandler<HTMLButtonElement>; 
}