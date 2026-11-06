// components/icons.jsx
import React from 'react';
import * as Lucide from 'lucide-react';
import Image from 'next/image';

export function Leaf(props) {
  const { size = 20, className = '', ...rest } = props || {};
  return (
    <Image
      src="/logo-laboratorio.png"
      alt="Logo Laboratorio"
      width={size}
      height={size}
      className={className}
      {...rest}
    />
  );
}

export * from 'lucide-react';