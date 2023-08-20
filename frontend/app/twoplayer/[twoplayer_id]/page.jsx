"use client";

// import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuizSetting from "../../../components/QuizSetting";
import ShareLink from "../../../components/ShareLink";

const MockData = {
  id: 1,
  created_at: "2023-08-13",
  title: "React中的Key概念",
  questions: [
    {
      id: 1,
      difficulty: "簡單",
      content: "React中的key的作用是什麼？",
      options: [
        {
          id: 1,
          content: "協助React辨識元件的位置",
        },
        {
          id: 2,
          content: "控制元件的CSS樣式",
        },
        {
          id: 3,
          content: "定義元件的初始狀態",
        },
        {
          id: 4,
          content: "用於元件的事件處理",
        },
      ],
      correct_answer: 1,
      explanation: "key用於協助React辨識元件的位置，從而確定元件的新增、移除或修改，以避免可能出現的錯誤。",
    },
    {
      id: 2,
      difficulty: "普通",
      content: "下列關於key的敘述何者正確？",
      options: [
        {
          id: 1,
          content: "key需要是隨機生成的數值",
        },
        {
          id: 2,
          content: "使用index作為key可以確保元件正確渲染",
        },
        {
          id: 3,
          content: "key需要是獨特唯一的",
        },
        {
          id: 4,
          content: "隨便",
        },
      ],
      correct_answer: 3,
      explanation: "正確的key需求是獨特唯一且穩定可預測的，不應使用index作為key，因為可能會導致渲染錯誤。",
    },
    {
      id: 3,
      difficulty: "普通",
      content: "題目3",
      options: [
        {
          id: 1,
          content: "1",
        },
        {
          id: 2,
          content: "2",
        },
        {
          id: 3,
          content: "3",
        },
        {
          id: 4,
          content: "隨便",
        },
      ],
      correct_answer: 3,
      explanation: "正確的key需求是獨特唯一且穩定可預測的，不應使用index作為key，因為可能會導致渲染錯誤。",
    },
  ],
};
// const socket = io(`ws://localhost:3000/twoplayer/${id}`);
function Page() {
  const [quizStatus, setQuizStatus] = useState("start");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionSeconds, setQuestionSeconds] = useState(10);
  const [seconds, setSeconds] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [randomOptions, setRandomOptions] = useState(false);
  const [randomOrder, setRandomOrder] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(MockData.questions.length);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [useCorrectRatio, setUseCorrectRatio] = useState(false);
  const [correctRatio, setCorrectRatio] = useState(1.05);
  const [score, setScore] = useState(0);
  const [hasClickOption, setHasClickedOption] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [consecutiveCorrectAnswers, setConsecutiveCorrectAnswers] = useState(false);
  const router = useRouter();
  // TODO:websocket雙人對戰
  // const [participants, setParticipants] = useState([]);
  // const [opponentScore, setOpponentScore] = useState(0);
  // useEffect(() => {
  //   socket.on("participantConnected", (participantId) => {
  //     setParticipants((prevParticipants) => [...prevParticipants, participantId]);
  //     if (participants.length === 2) {
  //       // Both participants are connected, start the game here
  //       setQuizStatus("process");
  //       setSeconds(questionSeconds);
  //     }
  //   });
  //   return () => {
  //     socket.off("participantConnected");
  //   };
  // }, [participants]);
  // useEffect(() => {
  //   socket.on("scoreUpdate", (updatedScores) => {
  //     setScore(updatedScores[participantId]);
  //     setOpponentScore(updatedScores[opponentParticipantId]);
  //   });
  //   return () => {
  //     socket.off("scoreUpdate");
  //   };
  // }, [participantId, opponentParticipantId]);
  useEffect(() => {
    setShuffledOptions(
      randomOptions
        ? [...MockData.questions[questionIndex].options].sort(() => Math.random() - 0.5)
        : [...MockData.questions[questionIndex].options]
    );
  }, [questionIndex, randomOptions]);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    if (quizStatus === "process") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });
  const moveToNextQuestion = () => {
    if (questionIndex === MockData.questions.length - 1) {
      setQuizStatus("end");
    } else {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setSeconds(questionSeconds);
      setHasClickedOption(false);
    }
  };
  useEffect(() => {
    if (quizStatus === "process") {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          moveToNextQuestion();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizStatus, seconds]);
  const ModalToggleHandler = () => {
    setShowSetting((prev) => !prev);
    document.body.classList.toggle("modal-open");
  };
  const ShareLinkModalToggleHandler = () => {
    setShowShareLink((prev) => !prev);
    document.body.classList.toggle("modal-open");
  };
  // TODO:websocket雙人對戰
  // const startGameHandler = () => {
  //   if (participants.length === 2) {
  //     setQuizStatus("process");
  //     setSeconds(questionSeconds);
  //   } else {
  //     Swal.fire("必須人數到齊才能開始遊戲", "", "warning");
  //   }
  // };
  const StartPage = (
    <div className="border border-black rounded-xl min-w-[60rem] min-h-[60rem] items-center">
      <p className="text-center mt-[8rem] font-extrabold text-4xl">{MockData.title}</p>
      <div className="flex flex-col items-center mt-24">
        <button
          type="button"
          className="block px-24 py-4 text-4xl bg-[#8198BF] text-white rounded-xl mb-20"
          onClick={ShareLinkModalToggleHandler}
        >
          分享連結
        </button>
        {showShareLink && <ShareLink modalToggleHandler={ShareLinkModalToggleHandler} />}
        <button
          type="button"
          className="block px-24 py-4 text-4xl bg-[#8198BF] text-white rounded-xl mb-20"
          onClick={ModalToggleHandler}
        >
          測驗設定
        </button>
        {showSetting && (
          <QuizSetting
            modalToggleHandler={ModalToggleHandler}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            questionSeconds={questionSeconds}
            setQuestionSeconds={setQuestionSeconds}
            randomOptions={randomOptions}
            setRandomOptions={setRandomOptions}
            randomOrder={randomOrder}
            setRandomOrder={setRandomOrder}
            useCorrectRatio={useCorrectRatio}
            setUseCorrectRatio={setUseCorrectRatio}
            correctRatio={correctRatio}
            setCorrectRatio={setCorrectRatio}
          />
        )}
        <button
          type="button"
          onClick={() => {
            setQuizStatus("process");
            setSeconds(questionSeconds);
          }}
          // TODO:websocket雙人對戰
          // onClick={startGameHandler}
          className="block px-24 py-4 text-4xl bg-[#4783EA] text-white rounded-xl mb-20"
        >
          開始測驗
        </button>
        <button
          type="button"
          onClick={() => {
            router.push("/questionbanks");
          }}
          className="block px-24 py-4 text-4xl bg-[#8198BF] text-white rounded-xl mb-20"
        >
          回到題庫
        </button>
      </div>
    </div>
  );
  const handleOptionClick = (optionId) => {
    setSelectedOptionId(optionId);
    setHasClickedOption(true);
    const selectedOption = shuffledOptions.find((option) => option.id === optionId);
    const chooseCorrectAnswer =
      selectedOption && selectedOption.id === MockData.questions[questionIndex].correct_answer;
    const elapsedTime = questionSeconds - seconds + 0.5;
    const questionScore = Math.max(Math.round(100 - (100 * elapsedTime) / questionSeconds), 5);
    if (chooseCorrectAnswer) {
      setScore((prevScore) => prevScore + questionScore);
      setConsecutiveCorrectAnswers(true);
      // TODO:websocket雙人對戰
      // socket.emit("updateScore", {
      //   participantId,
      //   score,
      // });
    } else {
      setConsecutiveCorrectAnswers(false);
    }
    if (chooseCorrectAnswer && consecutiveCorrectAnswers && useCorrectRatio) {
      setScore((prevScore) => prevScore + Math.round(questionScore * correctRatio));
      // TODO:websocket雙人對戰
      // socket.emit("updateScore", {
      //   participantId,
      //   score,
      // });
    }
  };
  const OptionsItems = shuffledOptions.map((option) => {
    const isCorrectAnswer = option.id === MockData.questions[questionIndex].correct_answer;
    const isSelected = hasClickOption && option.id === selectedOptionId;
    let buttonClassName = "block px-24 py-4 text-2xl text-white rounded-xl mt-20 w-[45rem] leading-8 bg-[#4783EA]";
    if (isSelected) {
      buttonClassName += isCorrectAnswer ? " bg-green-500" : " bg-red-500";
    } else if (!isSelected && hasClickOption) {
      buttonClassName += " bg-slate-400";
    }
    return (
      <button
        type="button"
        onClick={() => handleOptionClick(option.id)}
        disabled={hasClickOption === true}
        key={option.id}
        className={buttonClassName}
      >
        {option.content}
      </button>
    );
  });

  const ProcessPage = (
    <div className="border border-black rounded-xl min-w-[60rem] min-h-[60rem] items-center">
      {MockData.questions.length > 0 && (
        <div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center p-4 mr-4 border rounded-lg">
              <p>你</p>
              <p className="text-3xl">目前分數: {score}</p>
            </div>
            <div className="flex flex-col items-center mt-10">
              <h1 className="mb-4 text-4xl">剩餘時間 : {seconds}</h1>
              <p className="text-4xl">{MockData.questions[questionIndex].content}</p>
              <div className="flex my-4">
                <p className="mr-3 text-3xl">難度 :</p>
                <p className="mr-6 text-3xl">{MockData.questions[questionIndex].difficulty}</p>
                <p className="mr-6 text-3xl">
                  {questionIndex + 1} / {MockData.questions.length}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 ml-4 border rounded-lg">
              <p>對手</p>
              {/* <p className="text-3xl">目前分數: {opponentScore}</p> */}
            </div>
          </div>

          <div className="flex flex-col items-center mb-10">{OptionsItems}</div>
        </div>
      )}
    </div>
  );
  function restartGameHandler() {
    setLoading(true);
    setQuizStatus("start");
    setSeconds(10);
    setQuestionIndex(0);
    setScore(0);
    setConsecutiveCorrectAnswers(false);
    setHasClickedOption(false);
    setLoading(false);
  }
  const EndPage = (
    <div className="flex flex-col border border-black rounded-xl min-w-[60rem] min-h-[60rem] items-center justify-center">
      <p className="text-4xl">你的得分: {score}</p>
      {/* <div>
            <p className="text-4xl">你的分數: {score}</p>
            <p className="text-4xl">對方的分數: {opponentScore}</p>
            <p className="text-4xl">结果: {score >opponentScore && "你贏了!"}</p>
            <p className="text-4xl">结果: {score <opponentScore && "你輸了!"}</p>
            <p className="text-4xl">结果: {score ===opponentScore && "平局"}</p>
          </div> */}
      <button
        type="button"
        onClick={restartGameHandler}
        className="block px-24 py-4 text-4xl bg-[#4783EA] text-white rounded-xl mt-20 disabled:opacity-50"
      >
        重新測驗
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => {
          setLoading(true);
          router.push("/questionbanks");
        }}
        className="block px-24 py-4 text-4xl bg-[#4783EA] text-white rounded-xl mt-20 disabled:opacity-50"
      >
        回到題庫
      </button>
    </div>
  );
  return (
    <div className="flex justify-center mt-[5rem]">
      {quizStatus === "start" && StartPage}
      {quizStatus === "process" && ProcessPage}
      {quizStatus === "end" && EndPage}
    </div>
  );
}

export default Page;