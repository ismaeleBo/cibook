import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Ground from "../Ground";
import Desk from "../Desk";

const EnvironmentScene = () => {
  // const colorOffset = new THREE.Vector2(0.0005, 0.0012);
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Desk />
          </>
        )}
      </CubeCamera>
      <spotLight
        intensity={10}
        angle={1}
        penumbra={0}
        position={[3, 5, 5]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        intensity={10}
        angle={1}
        penumbra={0}
        position={[3, 5, 5]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      {/* <EffectComposer>
        <DepthOfField
          focusDistance={0.0035}
          focalLength={0.01}
          bokehScale={3}
          height={480}
        />
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={colorOffset} // color offset
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer> */}
    </>
  );
};

export default EnvironmentScene;
