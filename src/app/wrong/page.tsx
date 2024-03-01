import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Link href={'/login'}>
        oops something went wrong, return to login page
      </Link>
    </div>
  );
};

export default page;
