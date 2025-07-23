import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatBot() {
  //store user input to send to api
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who won the latest Nobel Peace Prize?",
    "Where does pizza come from",
    "How do you make a BLT sandwich?",
  ];

  function surprise() {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  }

  async function getResponse() {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
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
          parts: [{text: value}]
        },
        {
          role: "model",
          parts: [{text: data}]
        },
      ]);
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong! Please try again later.");
    }
  }

  function clear() {
    setValue("");
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
          value={value}
          placeholder="Enter your questions here!"
          onChange={(e) => setValue(e.target.value)}
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
