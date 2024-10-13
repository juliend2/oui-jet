import { useEffect, useState } from "preact/hooks";

function ImageBoxForm() {
  return (
    <>
      <p>
        <input type="file" name="image" />
      </p>
    </>
  );
}

function LinkBoxForm() {
  return (
    <>
      <p>
        <input type="text" name="label" placeholder="Click here" />
      </p>
      <p>
        <input type="url" name="url" placeholder="https://www..." />
      </p>
    </>
  );
}

function TextBoxForm() {
  return (
    <>
      <p>
        <input type="text" name="text" placeholder="Type something..." />
      </p>
    </>
  );
}

export default function NewBox({ handleSubmit }) {
  const [boxType, setBoxType] = useState("text"); // or image
  const handleChangeType = (e) => {
    setBoxType(e.target.value);
  };

  const DynamicComponent = ((bType) => {
    switch (bType) {
      case "text":
        return TextBoxForm;
      case "link":
        return LinkBoxForm;
      case "image":
        return ImageBoxForm;
    }
  })(boxType);

  return (
    <div className="new-box-modal">
      <form action="" onSubmit={handleSubmit}>
        <p>
          <select name="" onChange={handleChangeType}>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="link">Link</option>
          </select>
        </p>
        <DynamicComponent />
      </form>
    </div>
  );
}
