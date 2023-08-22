'use client'
import React, { useRef, FC } from "react";

interface IndexProps {
  primary: string;
  secondary: string;
}

const Index: FC<IndexProps> = ({ primary, secondary }) => {
  const text1 = useRef<HTMLParagraphElement | null>(null);
  const text2 = useRef<HTMLParagraphElement | null>(null);

  return (
    <div className="perspective-text__container">
      <p className="perspective-text__primary" ref={text1}>
        {primary}
      </p>
      <p className="perspective-text__secondary" ref={text2}>
        {secondary}
      </p>
    </div>
  );
};

export default Index;
