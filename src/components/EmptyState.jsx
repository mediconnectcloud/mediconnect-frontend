export default function EmptyState({ message = "Nothing here yet." }) {
  return <p className="muted state-message">{message}</p>;
}
