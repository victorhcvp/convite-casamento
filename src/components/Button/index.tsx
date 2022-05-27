import Image from 'next/image';
import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';



interface ButtonProps extends InputHTMLAttributes<HTMLAnchorElement> {
  href: string;
  text: string;
  icon?: string;
  w?: number;
  h?: number;
  bgColor?: string;
  cStyle?: "small" | "normal";
  target?: "_blank" | "_self";
}

export function Button({href, bgColor, cStyle = "normal", target = "_self", icon, w, h, text, ...rest}:ButtonProps) {
  return (
    <a 
      className={`${styles.button} ${styles[cStyle]}`} 
      href={href} 
      style={{
        backgroundColor: bgColor,
      }} 
      target={target || "_self"}
      {...rest}
    >
      {icon && (
      <div>
        <Image src={icon} width={w} height={h} alt="Icon" />
      </div>
      )}
      {text}
    </a>
  );
}