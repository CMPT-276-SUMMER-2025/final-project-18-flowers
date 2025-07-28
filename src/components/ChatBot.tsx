import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Fuse from "fuse.js";


//Define a type for ChatMessage structure
type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

function ChatInterface({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  //store user input to send to api
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  //store chat history for UI and backend seperately to prevent sending model-only messages (like FAQ) to the backend
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // UI
  const [geminiHistory, setGeminiHistory] = useState<ChatMessage[]>([]); // Backend


  const surpriseOptions = [
    "Name top 3 foods in Taiwan",
    "Name top 3 malls in Taiwan",
    "Name 3 fun things to do in Taiwan",
    "Name the highest mountain in Taiwan",
    "Name the founder of Taiwan",
    "Name the traditional colour for weddings in Taiwan",
    "Name the unlucky number in Taiwan",
    "Name the largest lake in Taiwan",
    "Name the largest city in Taiwan",
    "Name the most popular sport in Taiwan",
    "Name the most popular drink in Taiwan",
    "Name the most popular fruit in Taiwan",
    "Name the city where the majority of the population is in Taiwan.",
    "Give me some basic Taiwan travel tips",
  ];

  //FAQs question list
  const faqList = [
    "How do I search for an attraction that I want?",
    "Where is the route/itinerary planner?",
    "I have encountered a bug/error, what should I do?",
  ];
  //FAQs answer list
  const faqAnswers: Record<string, string> = {
    "How do I search for an attraction that I want?": "Find the Search button on the top right corner of the website. You can search for attractions by entering keywords in the chat input. For example, type 'Taipei 101' to find information about that attraction.",
    "Where is the route/itinerary planner?": "In the top navigation bar, the itinerary planner is located in the 'Plan a trip' section. You can create a personalized travel itinerary by selecting attractions and adding them to your plan.",
    "I have encountered a bug/error, what should I do?": "The best way to report a bug or error is to use the 'Report a Bug' button located in the footer of the website (not yet finished). Please provide as much detail as possible about the issue you encountered.",
  };
  //Show FAQs in chat
  function showFAQ() {
    const faqText = faqList.map((q, i) => `${i + 1}. ${q}`).join("\n");
    const faqMessages: ChatMessage = {
      role: "model",
      parts: [{ text: `FAQ:\n\n${faqText}` }]
    };
    setChatHistory((oldChatHistory) => [...oldChatHistory, faqMessages]);
    //does not update geminiHistory since this is just a FAQ message
  }
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

    //Check if user input matches a question from FAQ list
    const fuse = new Fuse(faqList, {
      threshold: 0.4, // how fuzzy the match is (lower is stricter)
      includeScore: true,
    });

    const matches = fuse.search(userInput);
    const matchedFAQ = matches.length > 0 ? matches[0].item : null;

    if (matchedFAQ && faqAnswers[matchedFAQ]) {
      const faqReply = faqAnswers[matchedFAQ];
      setChatHistory((prev) => [
        ...prev,
        { role: "user", parts: [{ text: userInput }] },
        { role: "model", parts: [{ text: faqReply }] },
      ]);
      setGeminiHistory((prev) => [...prev, { role: "user", parts: [{ text: userInput }] }]);
      setUserInput("");
      setError("");
      return;
    }
    
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          //send chat history to the api
          history: geminiHistory, //only send real messages
          message: userInput,
        }),
        headers: {
          "Content-Type": "application/json",
          "purpose": "chatbot-response",
        },
      };

      const response = await fetch("http://localhost:8000/gemini", options);
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      const data = await response.text();

      const userMessage: ChatMessage = { role: "user", parts: [{ text: userInput }] };
      const modelMessage: ChatMessage = { role: "model", parts: [{ text: data }] };

      //Update Update both UI and Gemini-safe chat history
      setChatHistory(prev => [...prev, userMessage, modelMessage]);
      setGeminiHistory(prev => [...prev, userMessage, modelMessage]);

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
    setGeminiHistory([]);
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
        <button onClick={showFAQ}>FAQ</button>
        <button onClick={surprise}>
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
            <ReactMarkdown
            components={{
              ul: ({ node, ...props}) => <ul className="chatbot-list" {...props} />,
              li: ({ node, ...props }) => <li className="chatbot-list-item" {...props} />,
            }}
            >
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
