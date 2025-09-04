import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 dark:bg-black bg-white  flex items-center justify-center z-50 overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 h-16 animate-pulse-scale"
        viewBox="0 0 120 48"
        fill="none"
      >
        {/* Кабіна вантажівки */}
        <rect x="0" y="14" width="40" height="20" fill="#0d9488" rx="4" />
        <rect x="10" y="8" width="25" height="12" fill="#14b8a6" rx="3" />
        {/* Причіп */}
        <rect x="44" y="18" width="60" height="14" fill="#2dd4bf" rx="4" />
        {/* Колеса кабіни */}
        <circle cx="14" cy="38" r="8" fill="#134e4a" />
        <circle cx="34" cy="38" r="8" fill="#134e4a" />
        {/* Колеса причепа */}
        <circle cx="64" cy="38" r="8" fill="#134e4a" />
        <circle cx="94" cy="38" r="8" fill="#134e4a" />
        <circle cx="114" cy="38" r="8" fill="#134e4a" />
        {/* Вікна кабіни */}
        <rect x="16" y="10" width="8" height="6" fill="#5eead4" rx="1" />
        <rect x="26" y="10" width="7" height="6" fill="#5eead4" rx="1" />
      </svg>

      <style jsx>{`
        @keyframes pulseScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }

        .animate-pulse-scale {
          animation: pulseScale 2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
