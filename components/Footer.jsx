import React from 'react';
import photof from '@/public/foter.png';
import Image from 'next/image';
function Footer() {
  return (
    <div className="z-[-10]">
      <Image alt="footerphoto" src={photof} />
    </div>
  );
}

export default Footer;
