import { useState, useEffect } from "react";

export default function GlowingCursorEffect() {
  //State to store the mouse position
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  //Update the mouse position on mouse move
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    //Add the event listener
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    
    <div
      id="glowing-cursor"
      
      className="fixed top-0 left-0 w-full h-full pointer-events-none select-none"
      style={{
        
        zIndex: 0,
        mixBlendMode: "difference",
      }}
    >
      <div
        //Outer circle
        className="absolute w-[200px] h-[200px] rounded-full bg-white opacity-30 blur-3xl"
        style={{
          //Position the circle at the mouse position
          transform: `translate(${mousePos.x - 100}px, ${mousePos.y - 100}px)`,
          transition: "transform 0.05s linear",
        }}
      />
    </div>
  );
}


