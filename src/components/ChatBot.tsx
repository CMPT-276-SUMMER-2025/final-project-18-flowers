import { useState } from "react";
import ReactMarkdown from "react-markdown";

//Define a type for ChatMessage structure
type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

function ChatInterface({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  //store user input to send to api
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const surpriseOptions = [
    "Name top 3 foods in Taiwan",
    "Name top 3 malls in Taiwan",
    "Name 3 fun things to do in Taiwan",
  ];

  function surprise() {
    let randomInput: string = '';
    const surpriseOptionIndex: number = Math.floor(Math.random() * surpriseOptions.length);
    randomInput = surpriseOptions[surpriseOptionIndex];
    if(randomInput === userInput) {
      randomInput = surpriseOptions[(surpriseOptionIndex + 1) % (surpriseOptions.length - 1)];
    }
    setUserInput(randomInput);
  }

  async function getResponse() {
    if (!userInput.trim()) {
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

      //Update chat history
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
      setError("");
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Something went wrong! Please try again later.");
    }
  }

  function clear() {
    setUserInput("");
    setError("");
    setChatHistory([]);
  }

  return (
    <div className={ `chatbot ${visible ? 'show' : ''}` }>
      <div className="chat-interface-icon-bar">
        <button onClick={onClose}>&#9660;</button>
        <img src={"/logo.png"}></img>
        <span>AI Chatbot</span>
      </div>
      <div className="chat-interface-top-bar">
        <span>What would you like to know?</span>
        <button onClick={surprise} disabled={chatHistory.length !== 0}>
          Surprise me!
        </button>
        <button onClick={() => setChatHistory([])}>Reset Chat</button>
      </div>

      <div className="chatbot-input-container">
        <input
          value={userInput}
          placeholder="Enter your questions here!"
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              getResponse();
            }
          }}
        />
        {!error && <button onClick={getResponse}>Send</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>

      {error && <p>{error}</p>}

      <div className="chatbot-output-section">
        {chatHistory.map((chatItem, index) => (
          <div key={index} className="chatbot-answer">
            <h3>
              <strong>{chatItem.role === 'user' ? 'You:' : 'Assistant:'}</strong>
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

function ChatButton({ visible, onOpen }: { visible: boolean; onOpen: () => void }) {
  return (
    <>
      {!visible && <button className="chatbot-button" onClick={onOpen}><img src={"/assets/chatbot/square-chat-bubble.svg"}></img></button>}
    </>
  )
}

export default function ChatBot() { 
  //keep track of whether chat is open or not
  const [chatIsOpen, setChatIsOpen] = useState(false);

  return (
    <>
      <ChatButton visible={chatIsOpen} onOpen={() => setChatIsOpen(true)}/>
      <ChatInterface visible={chatIsOpen} onClose={() => setChatIsOpen(false)} />
    </>
  )
}
