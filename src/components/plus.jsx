export default function PlusBox({ clickHandler }) {
  return (
    <div className={`box box--plus`}>
      <a href="#" onClick={clickHandler}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="45" y="10" width="10" height="80" fill="black" />
          <rect x="10" y="45" width="80" height="10" fill="black" />
        </svg>
      </a>
    </div>
  );
}
