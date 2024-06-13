import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useEffect } from "react";
import { Mesh } from "three";

const Desk: React.FC = () => {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/desk/scene.gltf"
  );

  useEffect(() => {
    // gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(3, -0.5, 5);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};

export default Desk;
