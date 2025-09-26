"use client";

import { useState } from "react";
import { usePersonalization } from "@/lib/personalization";

interface TriviaQuestion {
  prompt: string;
  answers: string[];
  correct: number;
  funFact: string;
}

const questions: TriviaQuestion[] = [
  {
    prompt: "Where did we share our very first dance together?",
    answers: ["A Brooklyn rooftop", "Kyoto street festival", "Big Sur overlook", "College formal"],
    correct: 1,
    funFact: "We made a mini circle in the crowd while a jazz trio improvised a love theme."
  },
  {
    prompt: "Which comfort food do we battle over on cozy nights?",
    answers: ["Extra crispy fries", "Matcha lava cake", "Truffle popcorn", "Coconut curry"],
    correct: 2,
    funFact: "Winner gets the remote during rom-com marathons."
  },
  {
    prompt: "What’s the name of our house plant that refuses to die?",
    answers: ["Fernando", "Leaf Erickson", "Sir Photosynthesalot", "Groot Jr."],
    correct: 0,
    funFact: "Fernando has a Spotify playlist to keep growing strong."
  }
];

export function TriviaGame() {
  const { guest } = usePersonalization();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const question = questions[current];

  function handleAnswer(index: number) {
    if (index === question.correct) {
      setScore((prev) => prev + 1);
    }
    setShowFact(true);
  }

  function nextQuestion() {
    setShowFact(false);
    setCurrent((prev) => (prev + 1) % questions.length);
  }

  return (
    <section className="section-card space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Trivia: How well do you know us?</h2>
        <p className="text-sm text-slate-600">
          {guest.name.split(" ")[0]}, rack up points for a chance to unlock a surprise drink ticket at check-in.
        </p>
      </div>
      <p className="text-lg font-semibold text-slate-800">{question.prompt}</p>
      <div className="grid gap-3 md:grid-cols-2">
        {question.answers.map((answer, index) => (
          <button
            key={answer}
            type="button"
            onClick={() => handleAnswer(index)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blush-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400"
            disabled={showFact}
          >
            {answer}
          </button>
        ))}
      </div>
      {showFact && (
        <div className="rounded-2xl bg-sage-100 p-4 text-sm text-sage-700" role="status">
          <p>{question.funFact}</p>
          <button
            type="button"
            onClick={nextQuestion}
            className="mt-3 inline-flex rounded-full bg-sage-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          >
            Next question
          </button>
        </div>
      )}
      <p className="text-xs uppercase tracking-wide text-slate-500">Scoreboard: {score} / {questions.length}</p>
    </section>
  );
}
