import "./App.css";
import { Provider } from "react-redux";
import reduxStore from "../models/reduxStore";
import { Form } from "./form/Form.jsx";

function App() {
  return (
    // Provide data store
    <Provider store={reduxStore}>
      <div className="App">
        <header className="App-header">
          <Form />
        </header>
      </div>
    </Provider>
  );
}

export default App;
