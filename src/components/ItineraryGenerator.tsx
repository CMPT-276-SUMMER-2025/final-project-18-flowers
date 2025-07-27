import { useState } from "react";

export default function ItineraryGenerator() {
  const [cityOption, setCityOption] = useState("");
  const [daysOption, setDaysOption] = useState("");
  const [interestOption, setInterestOption] = useState("");
  const [numAdultsOption, setNumAdultsOption] = useState("");
  const [numChildrenOption, setNumChildrenOption] = useState("");
  const [budgetOption, setBudgetOption] = useState("");

  const handleChange = (event: any, changeFor: string) => {
    if(changeFor === "city-option") {
      setCityOption(event.target.value); 
    } else if(changeFor === "days-option") {
      setDaysOption(event.target.value);
    } else if(changeFor === "interest-option") {
      setInterestOption(event.target.value)
    } else if(changeFor === "num-adults-option") {
      setNumAdultsOption(event.target.value);
    } else if(changeFor === "num-children-option") {
      setNumChildrenOption(event.target.value);
    } else if(changeFor === "budget-option") {
      setBudgetOption(event.target.value);
    }
  };
  
  return ( 
    <>
      <h1>Itinerary Generator</h1>
      <form className="ig-form">

        <div>
          <label htmlFor="city-option">Where do you plan to go?</label>
          <div>
            <select id="city-option" value={cityOption} onChange={(e) => handleChange(e,'city-option')}>
              <option value="">Select a city</option>
              <option value="Taipei">Taipei</option>
              <option value="Hualien">Hualien</option>
              <option value="Yilan">Yilan</option>
              <option value="Taichung">Taichung</option>
              <option value="Tainan">Tainan</option>
              <option value="Kaoshiung">Kaohsiung</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="days-option">How many days?</label>
          <div>
            <select id="days-option" value={daysOption} onChange={(e) => handleChange(e,'days-option')}>
              <option value="">Select # of days</option>
              <option value="1 day">1 day</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
              <option value="4 days">4 days</option>
              <option value="5 days">5 days</option>
              <option value="6 days">6 days</option>
              <option value="7 days">7 days</option>
              <option value="8 days">8 days</option>
              <option value="9 days">9 days</option>
              <option value="10 days">10 days</option>
              <option value="11 days">11 days</option>
              <option value="12 days">12 days</option>
              <option value="13 days">13 days</option>
              <option value="14 days">14 days</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="interest-option">What are you interested in?</label>
          <div>
            <select id="interest-option" value={interestOption} onChange={(e) => handleChange(e,'interest-option')}>
              <option value="">Select an interest</option>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="Theme Parks">Theme Parks</option>
            </select>
          </div>
        </div>

        <section className="ig-adult-children-count-row">
          <div>
            <label htmlFor="num-adults-option">Adults</label>
            <div>
              <select id="num-adults-option" value={numAdultsOption} onChange={(e) => handleChange(e,'num-adults-option')}>
                <option value=""># of adults</option>
                <option value="1 adult">1 adult</option>
                <option value="2 adults">2 adults</option>
                <option value="3 adults">3 adults</option>
                <option value="4 adults">4 adults</option>
                <option value="5 adults">5 adults</option>
                <option value="6 adults">6 adults</option>
                <option value="7 adults">7 adults</option>
                <option value="8 adults">8 adults</option>
                <option value="9 adults">9 adults</option>
                <option value="10+ adults">10+ adults</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="num-children-option">Children</label>
            <div>
              <select id="num-children-option" value={numChildrenOption} onChange={(e) => handleChange(e,'num-children-option')}>
                <option value=""># of children</option>
                <option value="1 child">1 child</option>
                <option value="2 children">2 children</option>
                <option value="3 children">3 children</option>
                <option value="4 children">4 children</option>
                <option value="5 children">5 children</option>
                <option value="6 children">6 children</option>
                <option value="7 children">7 children</option>
                <option value="8 children">8 children</option>
                <option value="9 children">9 children</option>
                <option value="10+ children">10+ children</option>
              </select>
            </div>
          </div>
        </section>

        <div>
          <label htmlFor="budget-option">What is your budget</label>
          <div>
            <select id="budget-option" value={budgetOption} onChange={(e) => handleChange(e,'budget-option')}>
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
        <button type="submit">Generate Itinerary</button>
      </form>
    </>
  );
}