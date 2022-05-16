import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './styles.module.scss';

type ButtonProps = {
  href: string;
  text: string;
  icon?: string;
  w: number;
  h: number;
  bgColor?: string;
  style?: "small" | "normal";
  target?: "_blank" | "_self";
}

export function Button(props:ButtonProps) {
  return (
    <a className={`${styles.button} ${styles[props.style || '']}`} href={props.href} style={{
      backgroundColor: props.bgColor,
    }} target={props.target || "_self"}>
      {props.icon && (
      <div>
        <Image src={props.icon} width={props.w} height={props.h} alt="Icon" />
      </div>
      )}
      {props.text}
    </a>
  );
}