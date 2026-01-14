import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import { useState } from "react";

function App() {
  const [tickets, setTickets] = useState([]);

  return (
    <div className="min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">Agentic AI – Ticket Automation</h1>
        <p className="text-gray-600 mt-2">Submit tickets and monitor automated action plans in real-time</p>
      </header>

      <TicketForm setTickets={setTickets} />
      <TicketList tickets={tickets} />
    </div>
  );
}

export default App;

