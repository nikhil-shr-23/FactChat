import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import Layout from "~/components/Layout";

const interests = [
  "Technology",
  "Science",
  "History",
  "Politics",
  "Sports",
  "Arts",
  "Philosophy",
  "Environment",
  "Health",
  "Education",
];

export default function CreateRoom() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const roomName = formData.get("roomName") as string;
    
    // Store room data in localStorage for demo purposes
    // In a real app, this would be stored in a database
    localStorage.setItem(`room_${roomName}`, JSON.stringify({
      name: roomName,
      interests: selectedInterests,
      createdAt: new Date().toISOString(),
    }));

    navigate(`/room/${roomName}`);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Room</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">
              Room Name
            </label>
            <input
              type="text"
              name="roomName"
              id="roomName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter a unique room name"
            />
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Interests
            </p>
            <div className="grid grid-cols-2 gap-3" role="group" aria-label="Select your interests">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`p-3 rounded-md text-sm font-medium ${
                    selectedInterests.includes(interest)
                      ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={selectedInterests.length === 0}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Create Room
          </button>
        </form>
      </div>
    </Layout>
  );
} 