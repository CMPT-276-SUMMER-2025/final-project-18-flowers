import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatBot(props) {
  //store user input to send to api
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Name top 3 foods in Taiwan",
    "Name top 3 malls in Taiwan",
    "Name 3 fun things to do in Taiwan",
  ];

  function surprise() {
    const randomInput =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setUserInput(randomInput);
  }

  async function getResponse() {
    if (!userInput) {
      setError("Error! Please ask a question!");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: userInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          //must be array of objects
          parts: [{text: userInput}]
        },
        {
          role: "model",
          parts: [{text: data}]
        },
      ]);
      setUserInput("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong! Please try again later.");
    }
  }

  function clear() {
    setUserInput("");
    setError("");
    setChatHistory([]);
  }

  return (
    <div className="chatbot">
      <p>
        What do you want to know?
        <button className="surprise" onClick={surprise} disabled={chatHistory.length !== 0}>
          Surprise me!
        </button>
      </p>
      <div className="input-container">
        <input
          value={userInput}
          placeholder="Enter your questions here!"
          onChange={(e) => setUserInput(e.target.value)}
        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, index) => (
          <div key={index} className="answer">
            <h3>
              <u>{chatItem.role}:</u>
            </h3>
            <ReactMarkdown>
              {chatItem.parts[0].text}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}
