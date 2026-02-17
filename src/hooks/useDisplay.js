import { useState, useEffect } from "react";

function useDisplay() {
  const [isMobileDisplay, setMobileDisplay] = useState(
    window.innerWidth <= 800
  );

  useEffect(() => {
    const handleResize = () => {
      setMobileDisplay(window.innerWidth <= 800);
    };
    window.addEventListener("resize", handleResize);
  });

  return [isMobileDisplay];
}

export default useDisplay;
