"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  function handleLogout() {
    router.push("/login");
  }
  return (
    <div className="bg-white w-full h-auto p-2.5 border-b-2 flex items-center">
      <Link href="/" passHref className="text-5xl text-[#8198BF] inter">
        GPTQuizHub
      </Link>
      <div className="flex h-6 ml-8 text-base font-bold">
        <Link href="/articles" passHref>
          <p className="ml-2 mr-2 border-[#8198BF] hover:border-b-4">文章</p>
        </Link>
        <Link href="/questionbanks" passHref>
          <p className="ml-2 mr-2 border-[#8198BF] hover:border-b-4">題庫</p>
        </Link>
        <Link href="/test-histories" passHref>
          <p className="ml-2 mr-2 border-[#8198BF] hover:border-b-4">測驗紀錄</p>
        </Link>
        <Link href="/joingame" passHref>
          <p className="ml-2 mr-2 border-[#8198BF] hover:border-b-4">加入測驗</p>
        </Link>
      </div>
      <div className="flex mx-6 ml-auto">
        <button type="button" className="mx-4 hover:-translate-y-2" onClick={handleLogout}>
          <Image src="/logout2.png" alt="logoutbtn" width={40} height={40} />
        </button>
        <Image src="/user.png" alt="User" width={40} height={40} className="" />
      </div>
    </div>
  );
}

export default Navbar;