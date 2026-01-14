import TicketCard from "./TicketCard";

export default function TicketList({ tickets }) {
  if (!tickets.length) return <p className="text-center text-gray-500">No tickets yet</p>;

  return (
    <div className="max-w-4xl mx-auto grid gap-4">
      {tickets.map(ticket => (
        <TicketCard key={ticket.ticket_id} ticket={ticket} />
      ))}
    </div>
  );
}

