import React, { useState, useEffect, useRef } from "react";

const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "💎", "7️⃣", "⭐"];

interface Reel {
  symbol: string;
  spinning: boolean;
  offset: number;
}

export const SlotMachine = () => {
  const [reels, setReels] = useState<Reel[]>([
    { symbol: "🍒", spinning: false, offset: 0 },
    { symbol: "🍒", spinning: false, offset: 0 },
    { symbol: "🍒", spinning: false, offset: 0 },
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState("Good Luck");
  const [credits, setCredits] = useState(1000);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [handlePulled, setHandlePulled] = useState(false);
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([null, null, null]);

  const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

  const checkWin = (finalReels: Reel[]) => {
    const symbols = finalReels.map((r) => r.symbol);

    // Three of a kind
    if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
      setShowWinAnimation(true);
      setTimeout(() => setShowWinAnimation(false), 2000);

      if (symbols[0] === "💎") {
        setMessage("JACKPOT - DIAMOND TRIPLET");
        setCredits((prev) => prev + 5000);
      } else if (symbols[0] === "7️⃣") {
        setMessage("LUCKY SEVENS - BIG WIN");
        setCredits((prev) => prev + 3000);
      } else if (symbols[0] === "⭐") {
        setMessage("STAR POWER - EXCELLENT");
        setCredits((prev) => prev + 2000);
      } else {
        setMessage("TRIPLE MATCH - WINNER");
        setCredits((prev) => prev + 1000);
      }
      return;
    }

    // Two of a kind
    if (symbols[0] === symbols[1] || symbols[1] === symbols[2] || symbols[0] === symbols[2]) {
      setMessage("PAIR BONUS");
      setCredits((prev) => prev + 200);
      return;
    }

    // No match
    setMessage("PLACE YOUR BET");
    setCredits((prev) => Math.max(0, prev - 100));
  };

  const pullHandle = () => {
    if (isSpinning || credits < 100) {
      if (credits < 100) setMessage("INSUFFICIENT CREDITS");
      return;
    }

    // Animate handle pull
    setHandlePulled(true);
    setTimeout(() => setHandlePulled(false), 600);

    // Start spinning after brief delay
    setTimeout(() => {
      setIsSpinning(true);
      setMessage("SPINNING...");

      // Start all reels spinning
      const newReels = reels.map((reel) => ({ ...reel, spinning: true }));
      setReels(newReels);

      // Animate each reel while spinning
      intervalRefs.current.forEach((_, index) => {
        intervalRefs.current[index] = setInterval(() => {
          setReels((prev) => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              symbol: getRandomSymbol(),
              offset: Math.random() * 10 - 5,
            };
            return updated;
          });
        }, 100);
      });

      // Stop reels one by one with delays
      const delays = [1800, 2400, 3000];
      const finalSymbols: string[] = [];

      delays.forEach((delay, index) => {
        setTimeout(() => {
          if (intervalRefs.current[index]) {
            clearInterval(intervalRefs.current[index]!);
            intervalRefs.current[index] = null;
          }

          const finalSymbol = getRandomSymbol();
          finalSymbols[index] = finalSymbol;

          setReels((prev) => {
            const updated = [...prev];
            updated[index] = { symbol: finalSymbol, spinning: false, offset: 0 };
            return updated;
          });

          // Check for win when all reels stopped
          if (index === 2) {
            setTimeout(() => {
              setIsSpinning(false);
              const finalReels = [
                { symbol: finalSymbols[0], spinning: false, offset: 0 },
                { symbol: finalSymbols[1], spinning: false, offset: 0 },
                { symbol: finalSymbols[2], spinning: false, offset: 0 },
              ];
              checkWin(finalReels);
            }, 300);
          }
        }, delay);
      });
    }, 200);
  };

  useEffect(() => {
    const ref = intervalRefs.current;
    return () => {
      ref.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return (
    <div className="w-full mx-auto relative" style={{ maxWidth: "380px" }}>
      {/* Luxury Machine Frame with Handle */}
      <div className="relative flex items-start">
        {/* Main Machine Body */}
        <div
          className="flex-1 rounded-3xl p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)",
            border: "3px solid transparent",
            backgroundImage:
              "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%), linear-gradient(135deg, #d4af37, #f4e5a1, #d4af37)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          {/* Top Crown/Header */}
          <div className="text-center mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent blur-xl"></div>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-[0.2em] relative"
              style={{
                background: "linear-gradient(135deg, #ffd700, #ffed4e, #ffd700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
                fontFamily: "Georgia, serif",
              }}
            >
              ROYAL SLOTS
            </h2>
            <div className="h-0.5 w-24 mx-auto mt-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>

          {/* Credits Display - Luxury LED Style */}
          <div className="mb-4 relative">
            <div
              className="rounded-xl p-3 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #0a0a0a, #1a1a1a)",
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.3)",
                border: "2px solid rgba(212, 175, 55, 0.3)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent"></div>
              <p className="text-[10px] font-semibold text-amber-400/60 tracking-widest mb-1">
                BALANCE
              </p>
              <p
                className="text-2xl sm:text-3xl font-bold tracking-wider relative"
                style={{
                  color: "#00ff41",
                  textShadow: "0 0 10px #00ff41, 0 0 20px #00ff41",
                  fontFamily: "Monaco, monospace",
                }}
              >
                ${credits.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Reels Display - Premium Glass Effect */}
          <div
            className="rounded-2xl p-4 mb-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              boxShadow: "inset 0 4px 20px rgba(0,0,0,0.9), 0 0 30px rgba(212, 175, 55, 0.2)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
            }}
          >
            {/* Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-amber-500/10 to-transparent blur-2xl"></div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 relative">
              {reels.map((reel, index) => (
                <div key={index} className="relative group">
                  {/* Reel Frame */}
                  <div
                    className="aspect-square rounded-lg relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #f5f5f5)",
                      boxShadow:
                        showWinAnimation && !reel.spinning
                          ? "0 0 30px rgba(255, 215, 0, 0.8), inset 0 2px 4px rgba(0,0,0,0.1)"
                          : "inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.3)",
                      border: "2px solid",
                      borderColor:
                        showWinAnimation && !reel.spinning ? "#ffd700" : "rgba(212, 175, 55, 0.3)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Inner Shadow */}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"></div>

                    {/* Symbol */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`text-5xl sm:text-6xl transition-all duration-300 ${
                          reel.spinning
                            ? "blur-md scale-90 opacity-70"
                            : "blur-0 scale-100 opacity-100"
                        }`}
                        style={{
                          transform: reel.spinning
                            ? `translateY(${reel.offset}px)`
                            : "translateY(0)",
                          filter: reel.spinning ? "blur(4px)" : "none",
                          textShadow: !reel.spinning ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
                        }}
                      >
                        {reel.symbol}
                      </span>
                    </div>

                    {/* Spinning Light Effect */}
                    {reel.spinning && (
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30 animate-pulse"></div>
                    )}
                  </div>

                  {/* Win Glow */}
                  {showWinAnimation && !reel.spinning && (
                    <div className="absolute inset-0 rounded-lg bg-amber-500/20 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Payline Indicator */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent -translate-y-1/2 pointer-events-none"></div>
          </div>

          {/* Message Display - Luxury LED */}
          <div
            className="rounded-xl p-3 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #0a0a0a, #1a1a1a)",
              boxShadow: "inset 0 2px 10px rgba(0,0,0,0.8)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              minHeight: "3rem",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
            <p
              className="text-sm sm:text-base font-bold tracking-[0.15em] relative uppercase"
              style={{
                color: showWinAnimation ? "#ffd700" : "#d4af37",
                textShadow: showWinAnimation
                  ? "0 0 20px #ffd700"
                  : "0 0 10px rgba(212, 175, 55, 0.5)",
                fontFamily: "Georgia, serif",
                transition: "all 0.3s ease",
              }}
            >
              {message}
            </p>
          </div>
        </div>

        {/* Slot Machine Handle on the Right */}
        <div className="flex flex-col items-center ml-2 sm:ml-4 pt-8">
          {/* Handle Mount */}
          <div
            className="w-8 h-8 rounded-full"
            style={{
              background: "radial-gradient(circle, #d4af37, #8b7355)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
              border: "2px solid rgba(212, 175, 55, 0.5)",
            }}
          ></div>

          {/* Handle Arm */}
          <div
            className="relative transition-all duration-500 origin-top cursor-pointer"
            onClick={pullHandle}
            style={{
              transform: handlePulled ? "rotate(25deg)" : "rotate(0deg)",
              height: "180px",
              width: "8px",
            }}
          >
            {/* Metal Rod */}
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "linear-gradient(to right, #c0c0c0, #e8e8e8, #c0c0c0)",
                boxShadow: "inset -2px 0 4px rgba(0,0,0,0.3), 2px 0 6px rgba(0,0,0,0.2)",
              }}
            ></div>

            {/* Red Ball Handle */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full cursor-pointer active:scale-95 transition-transform"
              style={{
                background: "radial-gradient(circle at 30% 30%, #ff1744, #dc143c, #8b0000)",
                boxShadow:
                  "inset -2px -2px 8px rgba(0,0,0,0.4), inset 2px 2px 8px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.5)",
                border: "2px solid rgba(139, 0, 0, 0.8)",
              }}
            >
              {/* Highlight */}
              <div
                className="absolute top-2 left-2 w-4 h-4 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent)",
                }}
              ></div>
            </div>
          </div>

          {/* Instruction Text */}
          <p
            className="text-[10px] text-amber-400/60 text-center mt-2 tracking-wider"
            style={{
              fontFamily: "Georgia, serif",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            PULL
          </p>
        </div>
      </div>
    </div>
  );
};
