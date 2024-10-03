import { createBrowserRouter } from "react-router-dom";
import { AddEvent } from "./components/AddEvent/AddEvent";
import "@/App.css";

function App() {
  return (
    <div id="app">
      <AddEvent />
    </div>
  );
}

export default App;
