import React, { Suspense } from "react";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { err?: any }> {
  state = { err: undefined as any };

  static getDerivedStateFromError(err: any) {
    return { err };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Preview component error:", error, errorInfo);
  }

  render() {
    if (this.state.err) {
      return (
        <div className="text-xs text-red-600 p-4 text-center">
          Preview crashed: {String(this.state.err?.message || this.state.err)}
        </div>
      );
    }
    return this.props.children;
  }
}

export function SafePreview({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="text-xs text-gray-400 p-4 text-center animate-pulse">
            Loading preview...
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
