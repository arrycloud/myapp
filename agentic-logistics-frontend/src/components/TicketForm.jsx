import { useState } from "react";
import axios from "axios";

export default function TicketForm({ setTickets }) {
  const [ticket, setTicket] = useState({
    customer_id: "",
    issue_type: "",
    description: "",
    priority: "normal"
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/agent/ticket", ticket);
      setTickets(prev => [res.data, ...prev]);
      setTicket({ customer_id: "", issue_type: "", description: "", priority: "normal" });
    } catch (err) {
      console.error("Error submitting ticket:", err);
      alert("Failed to submit ticket. Check console for details.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 mb-8 bg-white rounded-lg shadow space-y-4">
      <input
        type="text"
        placeholder="Customer ID"
        className="w-full p-2 border rounded"
        value={ticket.customer_id}
        onChange={(e) => setTicket({ ...ticket, customer_id: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Issue Type"
        className="w-full p-2 border rounded"
        value={ticket.issue_type}
        onChange={(e) => setTicket({ ...ticket, issue_type: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={ticket.description}
        onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
        required
      />
      <select
        className="w-full p-2 border rounded"
        value={ticket.priority}
        onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
      >
        <option value="normal">Normal</option>
        <option value="high">High</option>
        <option value="low">Low</option>
      </select>
      <button
        type="submit"
        className={`w-full py-2 rounded font-semibold text-white ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Ticket"}
      </button>
    </form>
  );
}

