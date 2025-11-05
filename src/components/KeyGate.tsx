import { useNavigate, useLocation } from "react-router-dom";

interface KeyGateProps {
  reason: string;
}

const KeyGate = ({ reason }: KeyGateProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-neutral-950 text-white">
      <div className="mx-auto max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Locked</h1>
          <p className="mt-2 text-sm text-white/70">{reason}</p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2 font-semibold"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
        <div className="text-left">
          <p className="text-xs uppercase tracking-wide text-white/50 mb-1">Requested Path</p>
          <pre className="text-xs rounded-lg bg-black/60 p-3 overflow-auto">
            {location.pathname}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default KeyGate;
