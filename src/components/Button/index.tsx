import Image from 'next/image';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    <Link 
      href={href} 
      target={target || "_self"}
    >
      <button className={`${styles.button} ${styles[cStyle]}`} style={{
        backgroundColor: bgColor,
      }}
      {...rest}
      >
        {icon && (
        <div>
          <Image src={icon} width={w} height={h} alt="Icon" />
        </div>
        )}
        {text}
      </button>
    </Link>
  );
}