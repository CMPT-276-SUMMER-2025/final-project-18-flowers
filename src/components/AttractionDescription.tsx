import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  placeName: string;
};

/**
 * This is a component for the desctription of an attraction page.
 */

/**
 * Displays an AI-generated description of a tourist attraction in Taiwan based on the provided place name
 * @param PlaceName Containing the place name
 * @returns description of the attraction
 */
const AttractionDescription = ({ placeName }: Props) => {
  const [aiDescription, setAIDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sets loading to true and clears errors until it handles the generation of the AI description by making a POST request to the backend server
   * @returns 
   */
  const handleGenerate = async () => {
    // If a place's name is not provided, prevent the fetch request and clear error
    if (!placeName) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://taiwanexplorers.onrender.com/gemini", {
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
  
  /**
   * Generates random delay for skeleton text loading screen
   * @param key Number to use as key for the skeleton line
   * @returns A random animation delay that simulates the loading line
   */
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
          {/* If loading, show loading screen, otherwise render the AI description */}
          {loading ? (
            // Generates 14 skeleton lines to simulate loading lines
          <div className="ig-loading-text-skeleton">
            {[...Array(14)].map((_, i) => GenerateTextSkeletonLine(i))}
          </div>
          ) : (
          aiDescription && <ReactMarkdown>{aiDescription}</ReactMarkdown>
          )}
        </div>

        {/* If no AI description is generated, show a button that generates AI description on click*/}
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
