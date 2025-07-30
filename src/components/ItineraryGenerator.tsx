import { useState } from "react";
import Select from "react-select";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import PlanTripMap from "./PlanTripMap";
import "../itinerary.css";

export default function ItineraryGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //track user's chosen selected options
  const [selectedCities, setSelectedCities] = useState<{ label: string; value: string }[]>([]);
  const [daysOption, setDaysOption] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<{label: string, value: string }[]>([]);
  const [numAdultsOption, setNumAdultsOption] = useState("");
  const [numChildrenOption, setNumChildrenOption] = useState("");
  const [budgetOption, setBudgetOption] = useState("");
  //store generated itinerary
  const [response, setResponse] = useState(""); 
  //store route coordinates for the map
  const [routeCoordinates, setRouteCoordinates] = useState<{ lat: number; lng: number }[]>([]);

  const taiwanCities = [
    "Changhua", "Chiayi",  
    "Hualien", "Kaohsiung", "Keelung", "Miaoli", 
    "Nantou", "New Taipei", "Pingtung",
    "Taichung", "Tainan", "Taipei", "Taitung", "Taoyuan",
    "Yilan", 
  ];

  const interests = [
    "Shopping", "Food", "Themeparks", "Culture", "Nature", "Street Markets",  
  ]

  // create city options that users can choose from
  const cityOptions = taiwanCities.map((city) => ({ label: city, value: city }));
  // create interest options that users can choose from
  const interestOptions = interests.map((interest) => ({ label: interest, value: interest}));

  const handleChange = (event: any, changeFor: string) => {
    if (changeFor === "days-option") {
      setDaysOption(event.target.value);
    }else if (changeFor === "num-adults-option") {
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

    const selectedInterestValues = selectedInterests.map((interest) => interest.value); 
    console.log("Selected interests: ", selectedInterestValues);

    // Check if any field is empty
    if (
      (selectedCityValues.length) === 0 || 
      (selectedInterestValues.length === 0) || 
      (!daysOption) || 
      (!numAdultsOption) || 
      (!numChildrenOption) || 
      (!budgetOption)
    ) {
      setResponse(""); // Clear previous result
      errorHandler("unfilled fields"); 
      return;
    }

    //check if the number of cities exceeds number of days
    if(selectedCityValues.length > Number(daysOption.slice(0, 2))) {
      setResponse(""); //clear previous result
      errorHandler("not enough days");
      return;
    }

    setIsLoading(true); // Start loading
    setResponse(""); // Clear previous result

    try {
      const requestBody= {
        cities: selectedCityValues,
        days: daysOption,
        interests: selectedInterestValues,
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
      const data = await response.json();
      console.log("Full response from server:", data);
      console.log("Markdown response content:", response);
      setResponse(data.text); 
      setRouteCoordinates(data.routeCoordinates || []); // The coordinates for the map
    } catch(error) {
      console.error("Fetch error: ", error);
      setErrorMessage("ERROR: Something went wrong while generating the itinerary. Please try again.");
    } finally {
    setIsLoading(false); // End loading
    }
  }

  //button to clear the form options and itinerary
  const handleClear = (event: any) => {
    event.preventDefault();
    setSelectedCities([]);
    setDaysOption("");
    setSelectedInterests([]);
    setNumAdultsOption("");
    setNumChildrenOption("");
    setBudgetOption("");
    setResponse("");
    setErrorMessage("");
  }

  //custom styles react-select
  const customReactSelectStyles = {
    control: (base: any) => ({
      ...base,
      margin: 0,
      width: "100%",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#BCBCBC",
      borderRadius: "8px",
      padding: "4px",
    }),
    container: (base: any) => ({
      ...base,
      margin: 0,
      width: "100%",
    })
  };

  function errorHandler(errorType: string) {
    if(errorType === "unfilled fields") {
      setErrorMessage("Please fill in all the fields before generating your itinerary.");
    }
    if(errorType === "not enough days") {
      setErrorMessage("Please ensure that the number of days you plan to stay is greater than or equal to the number of cities you plan to visit \u{1F601}.")
    }
  }

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
    <>
      <section className="itinerary-generator">
        <form className="ig-form" onSubmit={submitHandler}>
          <h1 className="ig-title">Generate Your <strong>Itinerary</strong></h1>
          <div className="ig-form-field">
            <label htmlFor="days-option">How long is your trip?</label>
            <div className="ig-form-box">
            <select
              className="ig-select"
              id="days-option"
              value={daysOption}
              onChange={(e) => handleChange(e, "days-option")}
            >
              <option value="">Select # of days</option>
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={`${i + 1} day${i === 0 ? "" : "s"}`}>
                  {i + 1} {i === 0 ? "day" : "days"}
                </option>
              ))}
            </select>
            </div>
          </div>

          <div className="ig-form-field">
            <label>Where do you plan to go?</label>
            <div>
              <Select
                styles={customReactSelectStyles}
                isMulti
                options={cityOptions}
                value={selectedCities}
                onChange={(newValue) => setSelectedCities([...newValue])}
                placeholder="Select cities in Taiwan..."
              />
            </div>
          </div>

          <div className="ig-form-field">
            <label>What are you interested in?</label>
            <div>
              <Select
                styles={customReactSelectStyles}
                isMulti
                options={interestOptions}
                value={selectedInterests}
                onChange={(newValue) => setSelectedInterests([...newValue])}
              />
            </div>
          </div>

          <section className="ig-adult-children-count-row">
            <div className="ig-form-field">
              <label htmlFor="num-adults-option">Adults</label>
              <div className="ig-form-box">
              <select
                className="ig-select"
                id="num-adults-option"
                value={numAdultsOption}
                onChange={(e) => handleChange(e, "num-adults-option")}
              >
                <option value=""># of adults</option>
                {[...Array(9)].map((_, i) => (
                  <option key={i} value={`${i + 1} adult${i ? "s" : ""}`}>
                    {i + 1} {i ? "adults" : "adult"}
                  </option>
                ))}
                <option value="10+ adults">10+ adults</option>
              </select>
              </div>
            </div>

            <div className="ig-form-field">
              <label htmlFor="num-children-option">Children</label>
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

          <div className="ig-form-field">
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
        
        {/* THIS IS WHERE THE GENERATED IG CONTENT APPEARS */}
        <div className="ig-response">
          <section>
            {errorMessage && <p className="ig-error-message">{errorMessage}</p>}
            {isLoading && <div className="ig-loading-text-skeleton">
              {[...Array(14)].map((_, i) => GenerateTextSkeletonLine(i))}
            </div>}
            {/* This converts markdown into html automatically via ReactMarkdown*/}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {response}
            </ReactMarkdown>
          </section>
        </div>
        <PlanTripMap routeCoordinates={routeCoordinates} />
      </section>
    </>
  );
}