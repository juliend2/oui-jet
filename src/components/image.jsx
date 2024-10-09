export default function ImageBox({ type, value }) {
  return (
    <div
      className={`box box--${type}`}
      style={`background-image: url(${value})`}
    >
      <a href={value} target="_blank"></a>
    </div>
  );
}
