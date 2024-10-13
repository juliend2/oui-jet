export default function LinkBox({ label, url }) {
  return (
    <div className={`box box--link`}>
      <a href={url} target="_blank">
        {label}
      </a>
    </div>
  );
}
