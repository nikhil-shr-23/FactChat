import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import Layout from "~/components/Layout";

export default function JoinRoom() {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if room exists in localStorage
    const roomData = localStorage.getItem(`room_${roomName}`);
    if (!roomData) {
      setError("Room not found. Please check the room name and try again.");
      return;
    }

    navigate(`/room/${roomName}`);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Join a Room</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
                setError("");
              }}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter room name"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Join Room
          </button>
        </form>
      </div>
    </Layout>
  );
} 