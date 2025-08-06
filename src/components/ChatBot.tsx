import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "../chatbot.css";
import Fuse from "fuse.js";

/**
 * This is the component for the chatbot feature.
 */

//Define a type for ChatMessage structure
type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

/**
 * The main component managing the chat UI, user input, chat history, and responses from the backend or FAQ.
 * @param visible whether the chat interface is visible or not
 * @param onClose function to close the chat interface 
 * @returns 
 */
function ChatInterface({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  //Stores user input to send to api.
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  //Stores one chat history for visual only and the other one for backend seperately to prevent sending model-only messages (like FAQ) to the backend.
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // UI
  const [geminiHistory, setGeminiHistory] = useState<ChatMessage[]>([]); // Backend
  //Checks if a chat message is loading.
  const [isLoading, setIsLoading] = useState(false);

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

  /**
   * Displays the FAQ list in the chat output.
   */
  function showFAQ() {
    //Loops though the faqList and format it as a string.
    const faqText = faqList.map((q, i) => `${i + 1}. ${q}`).join("\n");
    const faqMessages: ChatMessage = {
      role: "model",
      parts: [{ text: `FAQ:\n\n${faqText}` }]
    };
    //Does not update geminiHistory since this is just a FAQ message.
    setChatHistory((oldChatHistory) => [...oldChatHistory, faqMessages]);
  }

  /**
   * Picks a random question from a list of surprise questions and sets it as the user input.
   */
  function surprise() {
    let randomInput: string = '';
    const surpriseOptionIndex: number = Math.floor(Math.random() * surpriseOptions.length);
    randomInput = surpriseOptions[surpriseOptionIndex];
    //Prevents showing the same question as the user input.
    if(randomInput === userInput) {
      randomInput = surpriseOptions[(surpriseOptionIndex + 1) % (surpriseOptions.length - 1)];
    }
    setUserInput(randomInput);
  }

  const bottomRef = useRef<HTMLDivElement>(null);
  //Scrolls to the bottom of the chat output section when the chat history or loading state changes.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth"});
  }, [chatHistory, isLoading]);

  /**
   * Fetches a response from the backend or checks the FAQ list for a matching question.
   * @returns If matched a FAQ question, it replies with the answer. Otherwise, it sends the user input to the backend for processing.
   */
  async function getResponse() {
    //Checks if user input is empty and set an error message if it is.
    if (!userInput.trim()) {
      setError("Error! Please ask a question!");
      return;
    }

    //Checks if user input matches a question from FAQ list.
    const fuse = new Fuse(faqList, {
      threshold: 0.4, // how fuzzy the match is (lower is stricter)
      includeScore: true,
    });

    const matches = fuse.search(userInput);
    //Checks if there are any matches and gets the first match if it exists.
    const matchedFAQ = matches.length > 0 ? matches[0].item : null;

    //If matched a FAQ question, it replies with the answer.
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

    setIsLoading(true);
    const inputToSend = userInput;
    setUserInput("");
    
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          //Sends chat history to the api.
          history: geminiHistory, //Only sends real messages.
          message: inputToSend,
        }),
        headers: {
          "Content-Type": "application/json",
          "purpose": "chatbot-response",
        },
      };

      const response = await fetch("https://taiwanexplorers.onrender.com/gemini", options);
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      const data = await response.text();

      const userMessage: ChatMessage = { role: "user", parts: [{ text: userInput }] };
      const modelMessage: ChatMessage = { role: "model", parts: [{ text: data }] };

      //Updates both UI and Gemini-safe chat history.
      setChatHistory(prev => [...prev, userMessage, modelMessage]);
      setGeminiHistory(prev => [...prev, userMessage, modelMessage]);

      setError("");
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Something went wrong! Please try again later.");
    }
  }

  /**
   * Clears the visual chat history, gemini chat history, user input, and error message.
   */
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
          Surprise!
        </button>
        <button onClick={clear}>
          <img src="/assets/chatbot/reset-icon.png"></img>
        </button>
      </div>

      <div className="chatbot-input-container">
        <input
          value={isLoading === true ? 'Assistant is thinking...' : userInput}
          placeholder="Enter your questions here!"
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              getResponse();
            }
          }}
        />
        {/* Shows "Send" or "Clear" button depending on whether an error exists. */}
        {!error && <button onClick={getResponse}>Send</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>

      {error && <p>{error}</p>}

      <div className="chatbot-output-section">
        {/* Renders chat history with user and assistant messages as chat bubbles. */}
        {chatHistory.map((chatItem, index) => (
          <div key={index} className={`chatbot-text-bubble ${chatItem.role === 'user' ? 'user' : 'assistant'}`}>
            <h3 className="chatbot-you-header">
              {chatItem.role === 'user' ? 'You' : ''}
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
        {isLoading && 
        <div className="chatbot-output-text-bubble">
          <span></span>
          <span></span>
          <span></span>
        </div>}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

/**
 * Controls the chat's visibility state (chatIsOpen).
 * @param visible whether the chat button is visible or not
 * @param onOpen function to open the chat interface 
 * @returns rendered chat button and chat interface depending on visibility
 */
function ChatButton({ visible, onOpen }: { visible: boolean; onOpen: () => void }) {
  return (
    <>
      {!visible && <button className="chatbot-button" onClick={onOpen}><img src={"/assets/chatbot/square-chat-bubble.svg"}></img></button>}
    </>
  )
}

export default function ChatBot() { 
  //Keeps track of whether chat is open or not.
  const [chatIsOpen, setChatIsOpen] = useState(false);

  return (
    <>
      <ChatButton visible={chatIsOpen} onOpen={() => setChatIsOpen(true)}/>
      <ChatInterface visible={chatIsOpen} onClose={() => setChatIsOpen(false)} />
    </>
  )
}
