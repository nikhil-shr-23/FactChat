import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "FactChat - Home" },
    { name: "description", content: "Welcome to FactChat - Engage in meaningful, fact-based conversations" },
  ];
};

export default function Index() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">FactChat</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Your platform for engaging in meaningful, fact-based conversations and discussions.
        </p>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Join our community to:
          </p>
          <ul className="space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Engage in fact-based discussions</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Share verified information</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Learn from diverse perspectives</span>
            </li>
          </ul>
        </div>
        <div className="mt-12">
          <Link
            to="/create-room"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
