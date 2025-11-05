import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { routes, routeCategories, type RouteDefinition } from "@/lib/routes";
import { Sparkles, RotateCw, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getTodaySpin, logSpin, msUntilUtcMidnight, formatSpinResult } from "@/lib/dailySpin";
import { listKeys, type KeySlug, ROOM_KEYS_UPDATED_EVENT } from "@/lib/roomKeys";
import { useSupabase } from "@/integrations/supabase/auth";
import { SpinCountdown } from "@/components/SpinCountdown";

const REEL_COUNT = 3;
const SPIN_INTERVAL_BASE = 90;
const STOP_DELAYS = [1100, 1650, 2200];

interface SlotSymbol extends RouteDefinition {
  icon: LucideIcon;
  gradient: string;
  color: string;
}

interface ReelState {
  symbol: SlotSymbol;
  spinning: boolean;
}

type IntervalRef = ReturnType<typeof setInterval>;
type TimeoutRef = ReturnType<typeof setTimeout>;

const CasinoNav = () => {
  const navigate = useNavigate();
  const { supabase, user } = useSupabase();

  const slotSymbols = useMemo(() => {
    return routes
      .filter((route) => !route.path.includes(":"))
      .map((route) => {
        const categoryMeta = routeCategories[route.category];
        return {
          ...route,
          icon: route.icon ?? categoryMeta.icon,
          gradient: route.gradient ?? categoryMeta.gradient,
          color: categoryMeta.color,
        } as SlotSymbol;
      });
  }, []);

  const fallbackSymbol = useMemo(() => {
    const route = routes[0];
    const categoryMeta = routeCategories[route.category];
    return {
      ...route,
      icon: route.icon ?? categoryMeta.icon,
      gradient: route.gradient ?? categoryMeta.gradient,
      color: categoryMeta.color,
    } as SlotSymbol;
  }, []);

  const [reels, setReels] = useState<ReelState[]>(() => {
    if (slotSymbols.length === 0) {
      return Array.from({ length: REEL_COUNT }, () => ({
        symbol: fallbackSymbol,
        spinning: false,
      }));
    }
    return Array.from({ length: REEL_COUNT }, () => ({
      symbol: slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
      spinning: false,
    }));
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [status, setStatus] = useState("Pull the handle to unlock a TD Studios route.");
  const [jackpotSymbol, setJackpotSymbol] = useState<SlotSymbol | null>(null);
  const [ownedKeys, setOwnedKeys] = useState<KeySlug[]>([]);
  const [canSpinToday, setCanSpinToday] = useState(false);
  const [dailySpinLoaded, setDailySpinLoaded] = useState(false);
  const [countdownTarget, setCountdownTarget] = useState<number | null>(null);

  const intervalRefs = useRef<(IntervalRef | null)[]>(Array(REEL_COUNT).fill(null));
  const stopTimeouts = useRef<TimeoutRef[]>([]);
  const navigateTimeout = useRef<TimeoutRef | null>(null);
  const selectionsRef = useRef<(SlotSymbol | null)[]>(Array(REEL_COUNT).fill(null));

  const getRandomSymbol = useCallback(() => {
    if (slotSymbols.length === 0) {
      return fallbackSymbol;
    }
    return slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
  }, [fallbackSymbol, slotSymbols]);

  const cleanupTimers = useCallback(() => {
    intervalRefs.current.forEach((interval) => interval && clearInterval(interval));
    intervalRefs.current = Array(REEL_COUNT).fill(null);

    stopTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    stopTimeouts.current = [];

    if (navigateTimeout.current) {
      clearTimeout(navigateTimeout.current);
      navigateTimeout.current = null;
    }
  }, []);

  useEffect(() => () => cleanupTimers(), [cleanupTimers]);

  const refreshSpinStatus = useCallback(async () => {
    if (!user?.id) {
      setCanSpinToday(false);
      setCountdownTarget(null);
      setDailySpinLoaded(true);
      return;
    }

    try {
      const todaySpin = await getTodaySpin(supabase, user.id);
      setCanSpinToday(!todaySpin);
      setCountdownTarget(Date.now() + msUntilUtcMidnight());
    } catch (error) {
      console.error("Failed to fetch daily spin status", error);
      setCanSpinToday(false);
    } finally {
      setDailySpinLoaded(true);
    }
  }, [supabase, user?.id]);

  const refreshKeys = useCallback(async () => {
    if (!user?.id) {
      setOwnedKeys([]);
      return;
    }

    try {
      const keys = await listKeys(supabase, user.id);
      setOwnedKeys(keys);
    } catch (error) {
      console.error("Failed to load keys", error);
    }
  }, [supabase, user?.id]);

  useEffect(() => {
    refreshSpinStatus();
    refreshKeys();
  }, [refreshKeys, refreshSpinStatus]);

  useEffect(() => {
    const handler = () => {
      refreshKeys();
      refreshSpinStatus();
    };
    window.addEventListener(ROOM_KEYS_UPDATED_EVENT, handler);
    return () => window.removeEventListener(ROOM_KEYS_UPDATED_EVENT, handler);
  }, [refreshKeys, refreshSpinStatus]);

  const userHasKey = useCallback(
    (symbol: SlotSymbol) => {
      const requiredKey = symbol.meta?.requiresKey;
      if (!requiredKey) return true;
      return ownedKeys.includes(requiredKey);
    },
    [ownedKeys],
  );

  const finalizeReels = useCallback(async () => {
    const finalSymbols = selectionsRef.current.filter(Boolean) as SlotSymbol[];
    if (finalSymbols.length !== REEL_COUNT) return;

    setIsSpinning(false);

    const [first, ...rest] = finalSymbols;
    const isMatch = rest.every((symbol) => symbol.path === first.path);
    const resultString = formatSpinResult(finalSymbols.map((symbol) => symbol.path));

    if (user?.id) {
      try {
        await logSpin(supabase, user.id, resultString, isMatch, isMatch ? first.path : undefined);
      } catch (error) {
        console.error("Failed to log daily spin", error);
      }
    }

    setCanSpinToday(false);
    setCountdownTarget(Date.now() + msUntilUtcMidnight());

    if (isMatch) {
      const requiredKey = first.meta?.requiresKey;
      const hasAccess = !requiredKey || userHasKey(first);

      if (hasAccess) {
        setStatus(`Jackpot! Landing on ${first.name}...`);
        setJackpotSymbol(first);
        navigateTimeout.current = setTimeout(() => navigate(first.path), 900);
      } else {
        setStatus(
          `Locked: ${first.name} requires the ${requiredKey} key. Claim it before spinning again.`,
        );
        setJackpotSymbol(null);
      }
    } else {
      setStatus("No match yet—spin again or study the pay table below.");
      setJackpotSymbol(null);
    }
  }, [navigate, supabase, user?.id, userHasKey]);

  const pullHandle = useCallback(() => {
    if (isSpinning) return;

    if (!user?.id) {
      setStatus("Sign in to use the daily spin.");
      return;
    }

    if (!dailySpinLoaded) {
      setStatus("Loading your daily spin status...");
      return;
    }

    if (!canSpinToday) {
      setStatus("Daily spin already used. Come back after reset.");
      return;
    }

    cleanupTimers();
    selectionsRef.current = Array(REEL_COUNT).fill(null);
    setIsSpinning(true);
    setJackpotSymbol(null);
    setStatus("Reels spinning...");

    setReels((prev) => prev.map((reel) => ({ ...reel, spinning: true })));

    intervalRefs.current = intervalRefs.current.map((_, index) =>
      setInterval(
        () => {
          setReels((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], symbol: getRandomSymbol() };
            return next;
          });
        },
        SPIN_INTERVAL_BASE + index * 25,
      ),
    );

    STOP_DELAYS.forEach((delay, index) => {
      const timeout = setTimeout(() => {
        if (intervalRefs.current[index]) {
          clearInterval(intervalRefs.current[index]!);
          intervalRefs.current[index] = null;
        }

        const finalSymbol = getRandomSymbol();
        selectionsRef.current[index] = finalSymbol;

        setReels((prev) => {
          const next = [...prev];
          next[index] = { symbol: finalSymbol, spinning: false };
          return next;
        });

        if (index === STOP_DELAYS.length - 1) {
          const finalizeTimeout = setTimeout(() => {
            finalizeReels();
          }, 200);
          stopTimeouts.current.push(finalizeTimeout);
        }
      }, delay);

      stopTimeouts.current.push(timeout);
    });
  }, [
    canSpinToday,
    cleanupTimers,
    dailySpinLoaded,
    finalizeReels,
    getRandomSymbol,
    isSpinning,
    user?.id,
  ]);

  const highlightedSymbols = useMemo(() => slotSymbols.slice(0, 6), [slotSymbols]);

  const renderReel = (reel: ReelState, index: number) => {
    const Icon = reel.symbol.icon;
    const locked = !userHasKey(reel.symbol);

    return (
      <div
        key={index}
        className={`relative w-36 sm:w-44 h-56 rounded-3xl border-4 border-yellow-500/60 bg-gradient-to-b from-gray-900/90 to-black shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden ${
          reel.spinning ? "animate-pulse" : ""
        }`}
      >
        {locked && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
            <Lock className="h-3 w-3" /> Locked
          </span>
        )}
        <div className="absolute inset-x-4 top-4 h-1 rounded-full bg-yellow-200/60" />
        <div className="absolute inset-x-4 bottom-4 h-1 rounded-full bg-yellow-200/40" />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/50" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${reel.symbol.gradient}`}
          >
            <Icon
              className={`h-12 w-12 ${reel.spinning ? "animate-spin" : ""} text-white drop-shadow-lg`}
            />
          </div>
          <p className="mt-4 text-white font-semibold text-sm sm:text-base leading-tight">
            {reel.symbol.name}
          </p>
          <span className="text-xs text-white/60 mt-1">{reel.symbol.path}</span>
        </div>
      </div>
    );
  };

  const renderSymbolCard = (symbol: SlotSymbol) => {
    const Icon = symbol.icon;
    const locked = !userHasKey(symbol);

    return (
      <div
        key={symbol.path}
        className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          <div
            className={`h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${symbol.gradient}`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-semibold flex items-center gap-2">
              {symbol.name}
              {symbol.meta?.requiresKey && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${locked ? "bg-red-500/20 text-red-200" : "bg-green-500/20 text-green-200"}`}
                >
                  {locked ? "Locked" : "Unlocked"}
                </span>
              )}
            </p>
            <p className="text-xs text-white/60">{symbol.path}</p>
          </div>
        </div>
        <p className="text-sm text-white/70">{symbol.description}</p>
        {symbol.meta?.requiresKey && (
          <div className="text-xs text-white/50">Requires key: {symbol.meta.requiresKey}</div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "url('/lovable-uploads/td-studios-black-marble.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

      <div className="relative z-10 flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-5xl bg-white/5 border-white/15 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-yellow-300" />
              Casino Navigation
              <Sparkles className="h-8 w-8 text-yellow-300" />
            </CardTitle>
            <div className="flex flex-col items-center gap-2">
              <p className="text-white/70 text-lg">{status}</p>
              <Badge className="bg-white/10 border-white/20 text-white flex items-center gap-2">
                {!user?.id && "Sign in to spin"}
                {user?.id && canSpinToday && "Daily Spin Active"}
                {user?.id && !canSpinToday && (
                  <span className="flex items-center gap-2">
                    Come back in <SpinCountdown target={countdownTarget ?? undefined} />
                  </span>
                )}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap justify-center gap-4">
                {reels.map((reel, index) => renderReel(reel, index))}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={pullHandle}
                  disabled={isSpinning || !canSpinToday || !user?.id}
                  size="lg"
                  className="text-xl px-12 py-6 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:via-rose-500 hover:to-pink-600 shadow-lg hover:shadow-2xl disabled:opacity-60"
                >
                  <RotateCw className={`mr-3 h-6 w-6 ${isSpinning ? "animate-spin" : ""}`} />
                  {isSpinning ? "Spinning" : "Pull Handle"}
                </Button>
              </div>

              {jackpotSymbol && (
                <div className="text-center space-y-3">
                  <p className="text-2xl font-semibold text-green-300">
                    Triple match! Preparing to navigate to {jackpotSymbol.name}.
                  </p>
                  <p className="text-sm text-white/60">Route: {jackpotSymbol.path}</p>
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-xl font-semibold">Pay Table · Route Symbols</h3>
                  <Badge className="bg-yellow-500/20 text-yellow-200 border border-yellow-500/40">
                    Match all three to auto-navigate
                  </Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {highlightedSymbols.map(renderSymbolCard)}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Keys Owned
                </h4>
                {ownedKeys.length === 0 ? (
                  <p className="text-sm text-white/60">
                    No keys yet. Claim them on eligible pages.
                  </p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {ownedKeys.map((key) => (
                      <li key={key} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-400" />
                        {key}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <p className="text-center text-sm text-white/40">
              Need a specific destination? Use the command palette, collect room keys, or keep
              spinning—no coins or sounds required.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CasinoNav;
