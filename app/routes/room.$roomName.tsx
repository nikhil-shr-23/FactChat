import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import Layout from "~/components/Layout";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface RoomData {
  name: string;
  interests: string[];
  createdAt: string;
}

export default function Room() {
  const { roomName } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomData, setRoomData] = useState<RoomData | null>(null);

  useEffect(() => {
    // Load room data
    const data = localStorage.getItem(`room_${roomName}`);
    if (data) {
      setRoomData(JSON.parse(data));
    }
  }, [roomName]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "You", // In a real app, this would be the user's name
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  if (!roomData) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Room not found</h1>
          <p className="mt-2 text-gray-600">Please check the room name and try again.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-gray-900">{roomName}</h1>
            <p className="text-sm text-gray-600">
              Interests: {roomData.interests.join(", ")}
            </p>
          </div>

          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "You"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm font-medium mb-1">{message.sender}</p>
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
} 