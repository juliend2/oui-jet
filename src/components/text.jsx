export default function TextBox({ type, value }) {
  return (
    <div className={`box box--${type}`}>
      <p>{value}</p>
    </div>
  );
}
