import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  placeName: string;
};

const AttractionDescription = ({ placeName }: Props) => {
  const [aiDescription, setAIDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!placeName) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Purpose": "attraction-description",
        },
        body: JSON.stringify({ message: `Describe the tourist attraction called ${placeName} in Taiwan.` }),
      });

      const text = await res.text();
      setAIDescription(text);
    } catch (err) {
      setError("Failed to fetch AI description.");
    } finally {
      setLoading(false);
    }
  };
  

  //generate random delay for skeleton text loading screen
  function GenerateTextSkeletonLine(key: number) {
    const delay = (Math.random() * 1.5).toFixed(2);
    return (
      <div 
      key={key}
      style={{ animationDelay: `${delay}s`}}
      ></div>
    );
  }

  return (
    <div className="attraction-description">
      <h2 className="attraction-sub-titles">Description</h2>
      <div className="attraction-description-container">
        <div className="attraction-description-output">
          {error && <p className="ig-error-message">{error}</p>}
          {loading ? (
          <div className="ig-loading-text-skeleton">
            {[...Array(14)].map((_, i) => GenerateTextSkeletonLine(i))}
          </div>
          ) : (
          aiDescription && <ReactMarkdown>{aiDescription}</ReactMarkdown>
          )}
        </div>

        {!aiDescription && !loading && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleGenerate}
              className="attraction-description-button"
            >
              Ask AI for Description
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttractionDescription;
