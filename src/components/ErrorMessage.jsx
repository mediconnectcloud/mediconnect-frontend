export default function ErrorMessage({ message = "Something went wrong." }) {
  return <p className="error state-message">{message}</p>;
}
