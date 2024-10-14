import { useState, useEffect } from "preact/hooks";
// import preactLogo from "./assets/preact.svg";
// import viteLogo from "/vite.svg";
import "./app.css";
import ImageBox from "./components/image.jsx";
import TextBox from "./components/text.jsx";
import LinkBox from "./components/link.jsx";
import PlusBox from "./components/plus.jsx";
import NewBox from "./components/new_box.jsx";

const componentsMap = {
  image: ImageBox,
  text: TextBox,
  link: LinkBox,
};

function Box(props) {
  const [data, setData] = useState(props.data);
  const DynamicComponent = componentsMap[data.type] || TextBox;

  return <DynamicComponent {...data} />;
}

export function App() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/?action=index`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBoxes(data.boxes.map((d) => <Box data={d} />));
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  return (
    <>
      <div className="boxes">
        <PlusBox handleSubmit={handleNewBoxFormSubmit} />
        {boxes}
      </div>
    </>
  );
}
