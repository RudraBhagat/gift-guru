import React from "react";
import GiftForm from "./components/GiftForm";

export default function App() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-700">
        🎁 Gift Guru – AI Gift Recommender
      </h1>

      <GiftForm />
    </div>
  );
}
