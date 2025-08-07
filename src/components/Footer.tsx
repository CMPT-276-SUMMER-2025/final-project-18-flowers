import { Link } from 'react-router-dom';
import '../styles/footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        
        <Link to="/" className="footer-brand">
          <img
            src="/logo.png"
            alt="Taiwan Explorers Logo"
            className="footer-logo"
          />
          <span className="footer-title">Taiwan Explorers</span>
        </Link>


        <div className="footer-copy">
          © 2025 Taiwan Explorers. All rights reserved.
        </div>
        <div className="footer-socials">
          <a href="https://x.com/TaiwanExplorers" target="_blank" rel="noopener noreferrer">
            <img src="/assets/footer-logos/x-logo.png" alt="X" />
          </a>
          <a href="https://www.instagram.com/taiwanexplorers" target="_blank" rel="noopener noreferrer">
            <img src="/assets/footer-logos/instagram-logo.png" alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/@Taiwan-Explorers" target="_blank" rel="noopener noreferrer">
            <img src="/assets/footer-logos/youtube-logo.png" alt="YouTube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

