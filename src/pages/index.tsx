// pages/index.tsx

import { useState, useEffect } from "react";

const Interview = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions] = useState(6);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Fetch the first question when the component mounts
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Generate interview question" }),
      });
      const data = await response.json();
      setQuestion(data.result.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send the answer to the API for evaluation
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Evaluate the following answer: ${answer}` }),
      });
      const data = await response.json();
      setFeedback(data.result.choices[0].message.content);
      setShowFeedback(true);
    } catch (error) {
      console.error("Error evaluating answer:", error);
    }
  };

  const handleNextQuestion = () => {
    if (questionNumber < totalQuestions) {
      setQuestionNumber(questionNumber + 1);
      setAnswer("");
      setFeedback("");
      setShowFeedback(false);
      fetchQuestion();
    } else {
      // Interview is complete
      alert("Interview complete!");
    }
  };

  return (
    <div>
      {!showFeedback ? (
        <form onSubmit={handleSubmit}>
          <h2>
            Question {questionNumber} of {totalQuestions}
          </h2>
          <p>{question}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <button type="submit">Submit Answer</button>
        </form>
      ) : (
        <div>
          <h2>Feedback</h2>
          <p>{feedback}</p>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default Interview;
