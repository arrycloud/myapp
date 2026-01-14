export default function TicketCard({ ticket }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between mb-2">
        <h2 className="font-bold text-blue-700">Ticket ID: {ticket.ticket_id}</h2>
        <span className={`px-2 py-1 rounded text-white ${
          ticket.action_plan.some(a => a.tool === "rebook") ? "bg-red-500" : "bg-green-500"
        }`}>
          {ticket.status.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-600 mb-2">Customer ID: {ticket.ticket.customer_id}</p>
      <p className="text-gray-600 mb-2">Issue Type: {ticket.ticket.issue_type}</p>
      <p className="text-gray-600 mb-2">Description: {ticket.ticket.description}</p>

      <div className="mt-2">
        <h3 className="font-semibold mb-1">Action Plan:</h3>
        {ticket.action_plan.map((step, idx) => (
          <div key={idx} className="p-2 mb-1 border-l-4 border-blue-500 bg-gray-50 rounded shadow-sm">
            <p className="font-medium">{step.tool}</p>
            <p className="text-gray-600">{step.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

