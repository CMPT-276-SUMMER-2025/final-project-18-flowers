import { BrowserRouter as Router, 
         Routes, 
         Route,
         useLocation
} from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';
import NavBar from './components/NavBar';
import NavBarSolid from './components/NavBarSolid';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Interests from './pages/Interests';
import CityInterests from './components/CityInterests';

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <APIProvider 
        apiKey={apiKey} 
        onLoad={() => {
          console.log("Message: Maps API has loaded. Happy Developing!");
        }}
      >
        <Router>
          <AppContent />
        </Router> 
      </APIProvider>
    </>
  );
}

function AppContent() {
  const location = useLocation(); // get current route 
  const { pathname } = location; // get pathname (e.g., /destinations)

  console.log("pathname: " + pathname);

  if (pathname === "/") {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/destinations' element={<Destinations />}></Route>
          <Route path='/interests' element={<Interests />}></Route>
          <Route path="/destinations/:id" element={<CityInterests />} />
        </Routes>
      </>
    );
  }

  return( 
    <>
      <NavBarSolid />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/destinations' element={<Destinations />}></Route>
        <Route path='/interests' element={<Interests />}></Route>
        <Route path="/destinations/:id" element={<CityInterests />} />
      </Routes>
    </>
  );
}

export default App
