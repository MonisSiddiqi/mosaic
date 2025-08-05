import { Sparkles, Zap, Palette } from "lucide-react";

export const GlobalPending = () => {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-gradient-to-br">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 h-24 w-24 animate-spin rounded-full border-4 border-purple-200 border-t-purple-500"></div>

        {/* Inner pulsing circle */}
        <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <Palette className="h-8 w-8 animate-bounce text-purple-600" />
          </div>
        </div>

        {/* Floating icons */}
        <div className="absolute -left-8 -top-8">
          <Sparkles
            className="h-6 w-6 animate-pulse text-yellow-500"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
        <div className="absolute -right-6 -top-6">
          <Zap
            className="h-5 w-5 animate-bounce text-blue-500"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="absolute -bottom-6 -left-6">
          <Sparkles
            className="h-4 w-4 animate-ping text-purple-400"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
      </div>

      {/* Brand text */}
      <div className="mt-8 text-center">
        <h2 className="animate-pulse bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
          Crafty Future
        </h2>
        <p className="animate-fade-in mt-2 text-gray-600">
          Creating your experience...
        </p>
      </div>

      {/* Progress dots */}
      <div className="mt-6 flex space-x-2">
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-purple-500"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-purple-500"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-purple-500"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};
