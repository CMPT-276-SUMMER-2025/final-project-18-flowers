import Regions from "../components/Regions"
import ChatBot from "../components/ChatBot";


const Home = () => {
  return (
    <>
      <div id="bg-image" className="justify-center md:justify-normal">
        <h1 id="home-title" className="text-amber-50 font-bold text-5xl static left-0 md:absolute md:left-30">Taiwan Explorers</h1>
      </div>
      <Regions></Regions>
    </>
  )
}

export default Home
