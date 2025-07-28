import { useState } from "react";
import Select from "react-select";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export default function ItineraryGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //track user's chosen selected options
  const [selectedCities, setSelectedCities] = useState<{ label: string; value: string }[]>([]);
  const [daysOption, setDaysOption] = useState("");
  const [interestOption, setInterestOption] = useState("");
  const [numAdultsOption, setNumAdultsOption] = useState("");
  const [numChildrenOption, setNumChildrenOption] = useState("");
  const [budgetOption, setBudgetOption] = useState("");
  //store generated itinerary
  const [response, setResponse] = useState(""); 

  const taiwanCities = [
    "Changhua", "Chiayi", "Douliu", "Hsinchu",  
    "Hualien", "Kaohsiung", "Keelung", "Magong", "Miaoli", 
    "Nantou", "New Taipei", "Pingtung", "Puzi", "Taibao", 
    "Taichung", "Tainan", "Taipei", "Taitung", "Taoyuan",
    "Toufen", "Yilan", "Yuanlin", "Zhubei"
  ];

  const cityOptions = taiwanCities.map((city) => ({ label: city, value: city }));

  const handleChange = (event: any, changeFor: string) => {
    if (changeFor === "days-option") {
      setDaysOption(event.target.value);
    } else if (changeFor === "interest-option") {
      setInterestOption(event.target.value);
    } else if (changeFor === "num-adults-option") {
      setNumAdultsOption(event.target.value);
    } else if (changeFor === "num-children-option") {
      setNumChildrenOption(event.target.value);
    } else if (changeFor === "budget-option") {
      setBudgetOption(event.target.value);
    }
  };

  async function submitHandler(event: any) {
    event.preventDefault();
    setErrorMessage("");//clear any existing error messages

    const selectedCityValues = selectedCities.map((c) => c.value);
    console.log("Selected cities:", selectedCityValues);

    // Check if any field is empty
    if (cityOptions.length === 0 || 
      !daysOption || 
      !interestOption || 
      !numAdultsOption || 
      !numChildrenOption || 
      !budgetOption
    ) {
      setResponse(""); // Clear previous result
      setErrorMessage("Please fill in all the fields before generating your itinerary.");
      return;
    }

    setIsLoading(true); // Start loading
    setResponse(""); // Clear previous result

    try {
      const requestBody= {
        cities: selectedCityValues,
        days: daysOption,
        interest: interestOption,
        adults: numAdultsOption,
        children: numChildrenOption,
        budget: budgetOption,
      };
      
      const options = {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          "purpose": "generate-itinerary",
        },
      };

      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      setResponse(data);
    } catch(error) {
      console.error("Fetch error: ", error);
      setErrorMessage("Something went wrong while generating the itinerary :[ ). Please try again.");
    } finally {
    setIsLoading(false); // End loading
    }
  }

  //button to clear the form options and itinerary
  const handleClear = (event: any) => {
    event.preventDefault();
    setSelectedCities([]);
    setDaysOption("");
    setInterestOption("");
    setNumAdultsOption("");
    setNumChildrenOption("");
    setBudgetOption("");
    setResponse("");
    setErrorMessage("");
  }
  
  return (
    <>
      <h1 className="ig-title">Itinerary Generator</h1>
      <section className="itinerary-generator">
        <form className="ig-form" onSubmit={submitHandler}>
          <div>
            <label>Where do you plan to go?</label>
            <div className="ig-form-box">
              <Select
                className="ig-select"
                isMulti
                options={cityOptions}
                value={selectedCities}
                onChange={(newValue) => setSelectedCities([...newValue])}
                placeholder="Select cities in Taiwan..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="days-option">How many days?</label>
            <div className="ig-form-box">
            <select
              className="ig-select"
              id="days-option"
              value={daysOption}
              onChange={(e) => handleChange(e, "days-option")}
            >
              <option value="">Select # of days</option>
              {[...Array(14)].map((_, i) => (
                <option key={i + 1} value={`${i + 1} day${i === 0 ? "" : "s"}`}>
                  {i + 1} {i === 0 ? "day" : "days"}
                </option>
              ))}
            </select>
            </div>
          </div>

          <div>
            <label htmlFor="interest-option">What are you interested in?</label>
            <div className="ig-form-box">
            <select
              className="ig-select"
              id="interest-option"
              value={interestOption}
              onChange={(e) => handleChange(e, "interest-option")}
            >
              <option value="">Select an interest</option>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="Theme Parks">Theme Parks</option>
              <option value="Culture">Culture</option>
              <option value="Nature">Nature</option>
            </select>
            </div>
          </div>

          <section className="ig-adult-children-count-row">
            <div>
              <label htmlFor="num-adults-option">How many adults?</label>
              <div className="ig-form-box">
              <select
                className="ig-select"
                id="num-adults-option"
                value={numAdultsOption}
                onChange={(e) => handleChange(e, "num-adults-option")}
              >
                <option value=""># of adults</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} adult${i ? "s" : ""}`}>
                    {i + 1} {i ? "adults" : "adult"}
                  </option>
                ))}
                <option value="10+ adults">10+ adults</option>
              </select>
              </div>
            </div>

            <div>
              <label htmlFor="num-children-option">How many children?</label>
              <div className="ig-form-box">
              <select
                className="ig-select"
                id="num-children-option"
                value={numChildrenOption}
                onChange={(e) => handleChange(e, "num-children-option")}
              >
                <option value=""># of children</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i} child${i === 1 ? "" : "ren"}`}>
                    {i} {i === 1 ? "child" : "children"}
                  </option>
                ))}
                <option value="10+ children">10+ children</option>
              </select>
              </div>
            </div>
          </section>

          <div>
            <label htmlFor="budget-option">What is your budget?</label>
            <div className="ig-form-box">
            <select
              className="ig-select"
              id="budget-option"
              value={budgetOption}
              onChange={(e) => handleChange(e, "budget-option")}
            >
              <option value="">Select a budget (USD)</option>
              <option value="under $500">Under $500</option>
              <option value="$500 - $1,000">$500 – $1,000</option>
              <option value="$1,000 - $1,500">$1,000 – $1,500</option>
              <option value="$1,500 - $2,000">$1,500 – $2,000</option>
              <option value="$2,000 - $3,000">$2,000 – $3,000</option>
              <option value="over $3,000">Over $3,000</option>
            </select>
            </div>
          </div>

          <div className="ig-form-bottom-buttons">
            <button type="submit" className="ig-generate-button">
              Generate Itinerary
            </button>
            <button type="button" className="ig-clear-button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>

        <div className="ig-response">
          <h3>Itinerary</h3>
          <section>
            {errorMessage && <p className="ig-error-message">{errorMessage}</p>}
            {isLoading && <p className="ig-loading-message">Generating itinerary, please wait...</p>}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {response}
            </ReactMarkdown>
          </section>
        </div>
      </section>
    </>
  );
}