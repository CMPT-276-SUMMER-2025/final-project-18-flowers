import { useState } from "react";
import Select from "react-select";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import PlanTripMap from "./PlanTripMap";
import "../styles/itinerary.css";

/**
 * This is the component for the Itinerary Generator feature on the PlanTrip page.
 */

/**
 * Fetches and displays an itinerary from Google Gemini api.
 * @returns generated itinerary text
 */
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
  //Stores generated itinerary.
  const [response, setResponse] = useState(""); 
  //Stores route coordinates for the map.
  const [routeCoordinates, setRouteCoordinates] = useState<{ lat: number; lng: number }[]>([]);
  const [resetMapTrigger, setResetMapTrigger] = useState(0); // trigger map reset


  const taiwanCities = [
    "Taipei",
    "Hualien",
    "Yilan",
    "Kaohsiung",
    "Tainan",
    "Taichung",
    "New Taipei",
    "Keelung",
    "Taitung",
    "Nantou",
    "Chiayi",
    "Pingtung"
  ];

  const interests = [
    "Shopping", "Food", "Themeparks", "Culture", "Nature", "Street Markets",  
  ]

  //Creates city options that users can choose from.
  const cityOptions = taiwanCities.map((city) => ({ label: city, value: city }));
  //Creates interest options that users can choose from.
  const interestOptions = interests.map((interest) => ({ label: interest, value: interest}));

  /**
   * Handles change events from dropdown fields like day, number of adults/children, and budget.
   * @param event change event from dropdown field
   * @param changeFor string input from user
   */
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

  /**
   * Prevents page reload, collects and validates form input, fetch data from backend, and updates state with the response or error messages.
   * @param event change event in the form
   * @returns generated and stylized itinerary
   */
  async function submitHandler(event: any) {
    event.preventDefault();
    setErrorMessage("");//Clears any existing error messages.
    
    //Extracts .value field from selected dropdown menu.
    const selectedCityValues = selectedCities.map((c) => c.value);
    const selectedInterestValues = selectedInterests.map((interest) => interest.value); 

    //Checks if any field is empty.
    if (
      (selectedCityValues.length) === 0 || 
      (selectedInterestValues.length === 0) || 
      (!daysOption) || 
      (!numAdultsOption) || 
      (!numChildrenOption) || 
      (!budgetOption)
    ) {
      setResponse(""); //Clears previous result.
      errorHandler("unfilled fields"); 
      return;
    }

    //Checks if the number of cities exceeds number of days.
    if(selectedCityValues.length > Number(daysOption.slice(0, 2))) {
      setResponse(""); //clear previous result
      errorHandler("not enough days");
      return;
    }

    setRouteCoordinates([]); // Clear previous route coordinates
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

      const response = await fetch("https://taiwanexplorers.onrender.com/gemini", options);
      const data = await response.json();
      setResponse(data.text); 
      setRouteCoordinates([]); // clear previous route coordinates
      setTimeout(() => {
        setRouteCoordinates(data.routeCoordinates || []); // Set new route coordinates for the map
        setResetMapTrigger(prev => prev + 1); // triggers map reset
      }, 0); // force the map to re-render with new coordinates
    } catch(error) {
      console.error("Fetch error: ", error);
      setErrorMessage("ERROR: Something went wrong while generating the itinerary. Please try again.");
    } finally {
    setIsLoading(false); // End loading
    }
  }

  /**
   * Displays a button to clear the form options and itinerary.
   * @param event change event in the form
   */
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
    setRouteCoordinates([]); // Clear the route coordinates for the map
    setResetMapTrigger(prev => prev + 1);
  }

  //custom styles react-select
  const customReactSelectStyles = {
    control: (base: any) => ({
      ...base,
      margin: 0,
      width: "100%",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#D1D5DB",
      borderRadius: "1rem",
      padding: "4px",
    }),
    container: (base: any) => ({
      ...base,
      margin: 0,
      width: "100%",
    })
  };

  /**
   * Warns user with an error message when there is an error.
   * @param errorType type of error in the form
   */
  function errorHandler(errorType: string) {
    if(errorType === "unfilled fields") {
      setErrorMessage("Please fill in all the fields before generating your itinerary.");
    }
    if(errorType === "not enough days") {
      setErrorMessage("Please ensure that the number of days you plan to stay is greater than or equal to the number of cities you plan to visit \u{1F601}.")
    }
  }

  /**
   * Generates random delay for skeleton text loading screen.
   * @param key number to use as key for the skeleton line
   * @returns a random animation delay that simulates the loading line
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
    <>
      <div className="itinerary-generator">
        <form className="ig-form" onSubmit={submitHandler}>
          <h1 className="ig-title"><strong>Itinerary</strong> Generator</h1>
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
              {/* Generates the "days" dropdown option */}
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

        
        <div className="itinerary">
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
          <PlanTripMap routeCoordinates={routeCoordinates} resetTrigger={resetMapTrigger} />
        </div>
  
      </div>
    </>
  );
}