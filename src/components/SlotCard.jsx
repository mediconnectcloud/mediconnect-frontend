export default function SlotCard({ slot, selected, onSelect }) {
  const isAvailable = slot.status === "available";
  return (
    <button
      className={`slot ${selected ? "slot--selected" : ""} ${!isAvailable ? "slot--disabled" : ""}`}
      disabled={!isAvailable}
      onClick={() => onSelect(slot)}
    >
      <div className="slot__date">{slot.date}</div>
      <div className="slot__time">{slot.time}</div>
      {!isAvailable && <div className="slot__status">{slot.status}</div>}
    </button>
  );
}
