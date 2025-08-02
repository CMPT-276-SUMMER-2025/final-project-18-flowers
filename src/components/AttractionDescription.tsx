import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  placeName: string;
};

const AttractionDescription = ({ placeName }: Props) => {
  const [aiDescription, setAIDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDescription = async () => {
        setLoading(true);
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

    if (placeName) {
        fetchDescription();
    }
    }, [placeName]);


  if (loading) return <p>Loading description...</p>;
  if (error) return <p>{error}</p>;
  if (!aiDescription) return null;

  return (
    <div className="attraction-description">
      <h2 className="attraction-sub-titles">Description</h2>
      <ReactMarkdown>{aiDescription}</ReactMarkdown>
    </div>
  );
};

export default AttractionDescription;
