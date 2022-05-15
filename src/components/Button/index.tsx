import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './styles.module.scss';

type ButtonProps = {
  href: string;
  text: string;
  icon: string;
  w: number;
  h: number;
  bgColor?: string;
}

export function Button(props:ButtonProps) {
  return (
    <a className={styles.button} href={props.href} style={{
      backgroundColor: props.bgColor,
    }}>
      <div>
        <Image src={props.icon} width={props.w} height={props.h} alt="Icon" />
      </div>
      {props.text}
    </a>
  );
}