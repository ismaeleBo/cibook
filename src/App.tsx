import "bulmaswatch/superhero/bulmaswatch.min.css";
import TextEditor from "./components/TextEditor";
import { Provider } from "react-redux";
import { store } from "./state";

function App() {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
}

export default App;
