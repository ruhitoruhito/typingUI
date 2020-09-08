"use strict";
{
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const quizSetBeforeShuffle = [
    {
      q: "parking",
      c: [
        ["駐車場", "tyuusyazyou"],
        ["公園", "kouen"],
      ],
    },
    {
      q: "garden",
      c: [
        ["庭", "niwa"],
        ["山", "yama"],
      ],
    },
    {
      q: "view",
      c: [
        ["景色", "kesiki"],
        ["崖", "gake"],
      ],
    },
    {
      q: "sea",
      c: [
        ["海", "umi"],
        ["見る", "miru"],
      ],
    },
    {
      q: "liver",
      c: [
        ["肝臓", "kanzou"],
        ["小川", "ogawa"],
      ],
    },
    {
      q: "picture",
      c: [
        ["絵", "e"],
        ["本", "hon"],
      ],
    },
    {
      q: "chair",
      c: [
        ["いす", "isu"],
        ["机", "tukue"],
      ],
    },
    {
      q: "school",
      c: [
        ["学校", "gakkou"],
        ["高校", "koukou"],
      ],
    },
    {
      q: "bee",
      c: [
        ["蜂", "hati"],
        ["二度寝", "nidone"],
      ],
    },
    {
      q: "money",
      c: [
        ["金", "kane"],
        ["サル", "saru"],
      ],
    },
    {
      q: "thick",
      c: [
        ["太い", "hutoi"],
        ["病気", "byouki"],
      ],
    },
    {
      q: "shelf",
      c: [
        ["棚", "tana"],
        ["貝", "kai"],
      ],
    },
    {
      q: "insect",
      c: [
        ["虫", "musi"],
        ["家", "ie"],
      ],
    },
    {
      q: "tea",
      c: [
        ["お茶", "otya"],
        ["コーヒー", "ko-hi-"],
      ],
    },
  ];

  const quizSet = shuffle([...quizSetBeforeShuffle])

  const comments = [
    "おぉ",
    "普通人すね",
    "やり手普通人",
    "クラスに敵なし",
    "学校の王",
    "町内に敵なし",
    "県内トップレベル",
    "この島の覇者",
    "この国の覇者",
    "この星の覇者",
    "宇宙人レベル",
  ];

  class Panel {
    constructor(wordNum) {
      this.wordNum = wordNum;
      this.loc;
      this.word;
      this.japaneseWord;
      this.typingWord;
      this.typedTarget;
      this.missSpell;
      this.target;
      this.typingWord;
      this.board;
      this.answer;
      this.setup(this.wordNum);
    }
    setup(rightOrLeft) {
      this.loc = 0;

      this.word = quizSet[currentNum].c[rightOrLeft][1];
      this.japaneseWord = document.createElement("div");
      this.japaneseWord.classList.add("japaneseWord");
      this.japaneseWord.textContent = quizSet[currentNum].c[rightOrLeft][0];
      this.typingWord = document.createElement("ul");
      this.typingWord.classList.add("typingWord");
      this.typedTarget = document.createElement("li");
      this.typedTarget.classList.add("typedTarget");
      this.missSpell = document.createElement("li");
      this.missSpell.classList.add("missSpell");
      this.target = document.createElement("li");
      this.target.classList.add("target");
      this.target.textContent = this.word;
      this.typingWord.appendChild(this.typedTarget);
      this.typingWord.appendChild(this.missSpell);
      this.typingWord.appendChild(this.target);

      this.board = document.createElement("section");
      this.board.classList.add("board");
      this.board.appendChild(this.japaneseWord);
      this.board.appendChild(this.typingWord);

      this.answer = document.getElementById("answer");
      this.answer.appendChild(this.board);
    }

    typeCheck(e, rightOrLeft) {
      if (e.key === this.word[this.loc]) {
        if (choicedNum === rightOrLeft || choicedNum === -1) {
          choicedNum = rightOrLeft;
        } else {
          return;
        }
        this.loc++;
        typeScore++;
        soundCorrectType.currentTime = 0;
        soundCorrectType.play();
        this.japaneseWord.classList.add("choiced");
        this.updateTarget();
        if (this.loc === this.word.length) {
          answerBoard.classList.remove("new-question");
          if (rightOrLeft === 0) {
            wordScore++;
            soundCorrectAnswer.currentTime = 0;
            soundCorrectAnswer.play();
            scoreLabel.textContent = wordScore;
            this.board.classList.add("correct");
          } else {
            soundWrongAnswer.currentTime = 0;
            soundWrongAnswer.play();
            this.board.classList.add("wrong");
          }
          currentNum++;
          setTimeout(() => {
            nextQuizSet();
          }, 400);
        }
      } else {
        if (choicedNum !== rightOrLeft) {
          return;
        }
        this.missType();
      }
    }

    updateTarget() {
      this.typedTarget.textContent = this.word.substring(0, this.loc);
      this.target.textContent = this.word.substring(this.loc);
      this.missSpell.textContent = "";
    }

    missType() {
      this.typedTarget.textContent = this.word.substring(0, this.loc);
      this.target.textContent = this.word.substring(this.loc + 1);
      this.missSpell.textContent = this.word[this.loc];
      typeMiss++;
      soundMissType.currentTime = 0;
      soundMissType.play();
      typeMissLabel.textContent = typeMiss;
    }
    getAnswer() {
      return this.answer;
    }

    getJapaneseWord() {
      return this.japaneseWord;
    }
    getTarget() {
      return this.target;
    }
    getBoard() {
      return this.board;
    }
  }

  const startBoard = document.getElementById("start-board");
  const blackBoard = document.getElementById("black-board");
  const scoreBoard = document.getElementById("score-board");
  const totalScoreboard = document.getElementById("total-score");
  const kekkakun = document.getElementById("kekkakun");
  const scoreCommentLabel = document.getElementById("score-comment");
  const question = document.getElementById("question");
  const questionWord = document.querySelector(".e-question");
  const questionNumber = document.querySelector("#question > h4 > span");
  const answerBoard = document.getElementById("answer");
  const info = document.querySelector(".info");
  const scoreLabel = document.querySelector("#score-word > span");
  const timerLavel = document.querySelector("#timer > span");
  const result = document.querySelector(".result");
  const scoreResult = document.querySelector("#scoreResult > span");
  const typeScoreLabel = document.querySelector("#typeScore > span");
  const typeMissLabel = document.querySelector("#typeMiss > span");
  const accuracyLabel = document.querySelector("#accuracy > span");

  //music 音楽
  const chaimu = document.getElementById("chaimu");
  const akatonbo = document.getElementById("akatonbo");
  const ieji = document.getElementById("ieji");
  const aogebatoutosi = document.getElementById("aogebatoutosi");
  const musics = [akatonbo, ieji, aogebatoutosi];

  let currentNum = 0;
  let choicedNum = -1;
  let wordScore = 0;
  let typeScore = 0;
  let typeMiss = 0;
  let startTime;
  let timeLimit = 20 * 1000;
  let isPlaying = 0;
  let wordNums = [0, 1];
  let wordNumscopy = [...wordNums];
  let musicNum = Math.floor(Math.random() * musics.length);
  let shuffledWordNums = [
    wordNumscopy.splice(Math.floor(Math.random() * 2), 1)[0],
    wordNumscopy[0],
  ];

  scoreLabel.textContent = wordScore;
  questionWord.textContent = quizSet[currentNum].q;

  const panels = [
    new Panel(shuffledWordNums[0]),
    new Panel(shuffledWordNums[1]),
  ];

  function showResult() {
    scoreBoard.classList.add("appear");
    blackBoard.classList.add("end");
    const accuracy =
      typeScore + typeMiss === 0
        ? 0
        : (typeScore / (typeScore + typeMiss)) * 100;
    const totalScore = ((accuracy * wordScore) / 10).toFixed(0);
    setTimeout(() => {
      result.classList.add("show");
      scoreResult.textContent = `${wordScore}問 / ${currentNum} 問`;
      typeScoreLabel.textContent = typeScore;
      typeMissLabel.textContent = typeMiss;
      accuracyLabel.textContent = accuracy.toFixed(0) + "%";
    }, 300);
    setTimeout(() => {
      totalScoreboard.textContent = `${totalScore}点`;
      totalScoreboard.classList.add("appear");
      soundResultdetail.play();
    }, 2000);
    setTimeout(() => {
      kekkakun.classList.add("appear");
      let scoreComment = comments[Math.floor(totalScore / 10)];
      scoreCommentLabel.textContent = scoreComment;
      scoreCommentLabel.classList.add("appear");
    }, 3500);
    setTimeout(() => {
      soundComment1.play();
    }, 3200);
    setTimeout(() => {
      soundComment2.play();
    }, 5300);
  }

  function makeshuffledWordNums() {
    wordNums = [0, 1];
    shuffledWordNums = [
      wordNums.splice(Math.floor(Math.random() * 2), 1)[0],
      wordNums[0],
    ];
  }

  function nextQuizSet() {
    answerBoard.classList.add("new-question");
    choicedNum = -1;
    questionNumber.textContent = currentNum + 1;
    questionWord.textContent = quizSet[currentNum].q;
    while (answerBoard.firstChild) {
      answerBoard.removeChild(answerBoard.firstChild);
    }
    makeshuffledWordNums();
    panels.forEach((panel, index) => {
      panel.setup(shuffledWordNums[index]);
    });
  }

  function countDown() {
    let timeLeft = Math.ceil((startTime + timeLimit - Date.now()) / 1000);
    timerLavel.textContent = timeLeft;
    let timeoutId = setTimeout(() => {
      countDown();
    }, 50);
    if (timeLeft <= 0) {
      chaimu.play();
      musics[musicNum].pause();
      clearTimeout(timeoutId);
      isPlaying = 2;
      showResult();
    }
  }

  window.addEventListener("keydown", (e) => {
    if (isPlaying !== 0) {
      return;
    }
    if (e.key === "Enter") {
      soundGamestart.play();
      setTimeout(() => {
        musics[musicNum].play();
        startBoard.classList.add("slide");
      }, 350);

      setTimeout(() => {
        startBoard.classList.add("disappear");
        blackBoard.classList.remove("disappear");
      }, 1250);
      setTimeout(() => {
        question.classList.remove("disappear");
      }, 1950);
      setTimeout(() => {
        questionWord.classList.remove("disappear");
      }, 2050);
      setTimeout(() => {
        answerBoard.classList.remove("disappear");
        info.classList.remove("disappear");
        startTime = Date.now();
        countDown();
        isPlaying = 1;
      }, 2800);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (isPlaying !== 1) {
      return;
    }
    panels.forEach((panel, index) => {
      panel.typeCheck(e, shuffledWordNums[index]);
    });
    if (choicedNum === -1) {
      typeMiss++;
      soundMissType.currentTime = 0;
      soundMissType.play();
      typeMissLabel.textContent = typeMiss;
    }
  });
}
