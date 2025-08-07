import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * This component scrolls to top of the page.
 */

/**
 * Scrolls to top of the page.
 * @returns 
 */

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0,0);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
