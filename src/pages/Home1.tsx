import React, { useEffect } from "react";

const Home1 = () => {
  useEffect(() => {
    document.title = "Locust Growth Home";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4 px-6">
        <h1 className="text-4xl font-semibold tracking-[0.2em]">LCG HOME - PLACEHOLDER</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          This route is the post-login destination. Replace this component with the production home
          experience when it is ready.
        </p>
      </div>
    </div>
  );
};

export default Home1;
