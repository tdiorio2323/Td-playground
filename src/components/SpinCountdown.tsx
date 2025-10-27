import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SpinCountdownProps {
  target?: number | null;
  className?: string;
}

const formatDuration = (ms: number) => {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const SpinCountdown = ({ target, className }: SpinCountdownProps) => {
  const [remaining, setRemaining] = useState(() =>
    target ? Math.max(target - Date.now(), 0) : 0
  );

  useEffect(() => {
    if (!target) return;

    const update = () => {
      setRemaining(Math.max(target - Date.now(), 0));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (!target) {
    return null;
  }

  return (
    <span className={cn("font-semibold tabular-nums", className)}>
      {formatDuration(remaining)}
    </span>
  );
};
