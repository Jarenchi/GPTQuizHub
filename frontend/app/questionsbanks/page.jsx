"use client";

import Link from "next/link";
import { useState } from "react";
import QuestionBankSideBar from "../../components/QuestionsBanksSideBar";
import QuestionsBanksCard from "../../components/QuestionsBanksCard";

const MockData = [
  {
    id: 1,
    title: "React 是什麼?",
  },
  {
    id: 2,
    title: "Docker 是什麼?",
  },
  {
    id: 3,
    title:
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
  },
];

function Page() {
  const [showQuizType, setShowQuizType] = useState(false);
  const questionsBankItems = MockData.map((questionsBank) => (
    <div
      key={questionsBank.id}
      className="flex items-center justify-between px-4 py-2 mb-3 border rounded-lg"
    >
      <div>
        <p className="max-w-6xl mr-3 text-2xl font-bold leading-6 truncate">
          {questionsBank.title}
        </p>
      </div>
      <div className="flex items-center">
        <div className="block text-base font-bold text-white bg-[#8198BF] py-2.5 px-4 rounded-md hover:opacity-50 mr-5">
          <Link
            href={`/questionsbanks/${questionsBank.id}`}
            className="flex items-center cursor-pointer"
          >
            複習
          </Link>
        </div>
        <button
          type="button"
          className="relative text-base font-bold text-white bg-[#25B857] py-2.5 px-4 rounded-md hover:opacity-50"
          onClick={() => setShowQuizType(!showQuizType)}
        >
          測驗形式
        </button>
        {showQuizType && (
          <div className="absolute bg-white border rounded-lg">
            <Link
              href={`/quiz/${questionsBank.id}`}
              className="block text-base font-bold py-2.5 px-4 rounded-md hover:opacity-50 border-b"
            >
              單人測驗
            </Link>
            <Link
              href={`/one-on-one/${questionsBank.id}`}
              className="block text-base font-bold py-2.5 px-4 rounded-md hover:opacity-50 border-b"
            >
              雙人測驗
            </Link>
            <Link
              href={`/battle/${questionsBank.id}`}
              className="block text-base font-bol py-2.5 px-4 rounded-md hover:opacity-50"
            >
              多人測驗
            </Link>
          </div>
        )}
      </div>
    </div>
  ));
  return (
    <div className="flex justify-center mt-20">
      <div className="mr-10">
        <QuestionBankSideBar />
      </div>
      <div className="flex flex-col min-w-[60rem] rounded-lg bg-white border p-4 mr-6">
        <h1 className="mb-5 text-2xl font-bold leading-6">題庫</h1>
        <QuestionsBanksCard />
        {questionsBankItems}
      </div>
    </div>
  );
}

export default Page;
