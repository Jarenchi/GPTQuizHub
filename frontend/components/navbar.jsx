import React from "react";
import Image from "next/image";
import Link from "next/link";

const navbar = () => {
  return (
    <div className="bg-white w-full h-auto p-2.5 border-b-2 flex items-center">
      <Link href="/" passHref className="text-5xl text-[#8198BF] inter">GPTQuizHub</Link>
      <div className="flex h-6 ml-8 text-base font-bold">
        <Link href="/articles" passHref>
          <p className="ml-2 mr-2 border-[#8198BF] hover:border-b-4">文章</p>
        </Link>
        <Link href="/questionsbanks" passHref>
          <p className="ml-2 mr-2 border-[#8198BF] hover:border-b-4">題庫</p>
        </Link>
        <Link href="/" passHref>
          <p className="ml-2 mr-2 border-[#8198BF] hover:border-b-4">測驗紀錄</p>
        </Link>
      </div>
      <Image src="/user.png" alt="User" width={40} height={40} className="ml-auto" />
    </div>
  );
};

export default navbar;