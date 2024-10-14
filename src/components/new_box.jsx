import { useState } from "preact/hooks";

function ImageBoxForm() {
  return (
    <>
      <p>
        <label htmlFor="file">File</label>
        <input type="file" id="file" name="image" />
      </p>
    </>
  );
}

function LinkBoxForm() {
  return (
    <>
      <p>
        <label htmlFor="label">Label (optional)</label>
        <input type="text" id="label" name="label" placeholder="Click here" />
      </p>
      <p>
        <label htmlFor="url">URL</label>
        <input type="url" id="url" name="url" placeholder="https://www..." />
      </p>
    </>
  );
}

function TextBoxForm() {
  return (
    <>
      <p>
        <label htmlFor="text">Text</label>
        <textarea name="text" id="text" placeholder="Type something..."></textarea>
      </p>
    </>
  );
}


export default function NewBox({ handleSubmit, closeHandler }) {
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

  /**
   * 
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setBoxes(data.boxes.map((d) => <Box data={d} />));
    })
    .catch((error) => console.error("Error: ", error));

   */

  return (
    <div className="box box--newForm">
      <a href="#" className='newForm__close' onClick={closeHandler}>×</a>
      <form action="" onSubmit={handleSubmit} className="newForm__form">
        <p>
          <label htmlFor="type">Box type</label>
          <select name="type" id="type" onChange={handleChangeType}>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="link">Link</option>
          </select>
        </p>
        <DynamicComponent />
        <button>Add</button>
      </form>
    </div>
  );
}
