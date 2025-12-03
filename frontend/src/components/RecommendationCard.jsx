import React from "react";

export default function RecommendationCard({ item }) {
  if (item.error) {
    return <p className="text-red-500">{item.error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col">
      <img
        src={item.image_url}
        alt={item.product_name}
        className="w-full h-48 object-cover rounded-xl"
      />

      <h2 className="text-xl font-semibold mt-3">{item.product_name}</h2>
      <p className="text-gray-700 mt-2 text-sm">{item.why_recommended}</p>

      <p className="mt-3 font-bold text-purple-700">₹{item.price}</p>

      <a
        href={item.shopping_link}
        target="_blank"
        className="mt-4 bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700"
      >
        Buy Now
      </a>
    </div>
  );
}
