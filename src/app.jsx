import { useState, useEffect } from "preact/hooks";
// import preactLogo from "./assets/preact.svg";
// import viteLogo from "/vite.svg";
import "./app.css";
import ImageComponent from "./components/image.jsx";
import TextComponent from "./components/text.jsx";

const componentsMap = {
  image: ImageComponent,
  text: TextComponent,
};

function Box(props) {
  const [data, setData] = useState(props.data);
  const DynamicComponent = componentsMap[data.type] || TextComponent;

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

  return <div className="boxes">{boxes}</div>;
}
