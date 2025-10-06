import ClientChat from "./ClientChat";

export default function ChatbotPage() {
  return (
    <main className="min-h-screen bg-black text-gray-100">
      <div className="py-10">
        <h1 className="text-center text-2xl font-bold mb-6">EcomKar Chatbot</h1>
        <ClientChat />
      </div>
    </main>
  );
}


