import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import { store } from "./state";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import EnvironmentScene from "./components/EnvironmentScene";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <Canvas shadows style={{ height: "100vh" }}>
          <EnvironmentScene />
        </Canvas>
      </Suspense>
    </Provider>
  );
}

export default App;
