import { BrowserRouter as Router, 
         Routes, 
         Route,
         useLocation
} from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';
import ScrollToTop from './components/scrollToTop';
import NavBar from './components/NavBar';
import NavBarSolid from './components/NavBarSolid';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Interests from './pages/Interests';
import InterestAttraction from './pages/InterestAttraction';
import CityInterests from './pages/CityInterests';
import Attraction from './pages/Attraction';
import PlanTrip from './pages/PlanTrip';
import SearchPage from './pages/SearchPage';
import searchData from './data/searchData';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

/**
 * This is the main root component.
 */

/**
 * Loads Google Maps API, wraps the application in a router, passes API key and renders AppContent.
 * @returns loaded Google Maps API, router and app content
 */
function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <APIProvider 
        apiKey={apiKey} 
      >
        <Router>
          <AppContent />
        </Router> 
      </APIProvider>
    </>
  );
}

/**
 * Renders routes and components.
 * @returns components of the application
 */
function AppContent() {
  const location = useLocation(); // get current route 
  const { pathname } = location; // get pathname (e.g., /destinations)

  //If user is on the home page, shows a transparent navigation bar, else shows solid navigation bar.
  if (pathname === "/") {
    return (
      <>
        <NavBar />
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/destinations' element={<Destinations />}></Route>
          <Route path='/interests' element={<Interests />}></Route>
          <Route path="/interests/:attract" element={<InterestAttraction />} />
          <Route path='/plantrip' element={<PlanTrip />}></Route>
          <Route path="/destinations/:id" element={<CityInterests />} />
          <Route path="/destinations/:id/:attract" element={<Attraction />} />
          <Route path="/search" element={<SearchPage results={searchData} />} />
        </Routes>
        <ChatBot />
        <Footer />
      </>
    );
  }

  return( 
    <>
      <NavBarSolid />
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/destinations' element={<Destinations />}></Route>
        <Route path='/interests' element={<Interests />}></Route>
        <Route path="/interests/:attract" element={<InterestAttraction />} />
        <Route path='/plantrip' element={<PlanTrip />}></Route>
        <Route path="/destinations/:id" element={<CityInterests />} />
        <Route path="/destinations/:id/:attract" element={<Attraction />} />
        <Route path="/search" element={<SearchPage results={searchData}/>} />
      </Routes>
      <ChatBot />
      <Footer />
    </>
    );
  }


export default App
