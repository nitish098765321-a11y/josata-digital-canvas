import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, OrbitControls, Trail } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function NetworkNode({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.15;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  );
}

function DataStream({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = (Math.sin(state.clock.elapsedTime * 1.5 + start[0] * 3) + 1) / 2;
    ref.current.position.set(
      start[0] + (end[0] - start[0]) * t,
      start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 0.2,
      start[2] + (end[2] - start[2]) * t
    );
  });

  return (
    <Trail width={0.8} length={6} color="#a855f7" attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} />
      </mesh>
    </Trail>
  );
}

function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const ref = useRef<THREE.Line>(null!);
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  const material = useMemo(() => new THREE.LineBasicMaterial({ color: "#a855f7", opacity: 0.15, transparent: true }), []);

  return <primitive ref={ref} object={new THREE.Line(geometry, material)} />;
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={ref} args={[0.6, 64, 64]}>
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.25}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

function OrbitalRing({ radius, speed, axis }: { radius: number; speed: number; axis: "x" | "y" | "z" }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (axis === "x") ref.current.rotation.x = state.clock.elapsedTime * speed;
    if (axis === "y") ref.current.rotation.y = state.clock.elapsedTime * speed;
    if (axis === "z") ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <Torus ref={ref} args={[radius, 0.008, 16, 100]}>
      <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} transparent opacity={0.4} />
    </Torus>
  );
}

function Scene() {
  const nodes: [number, number, number][] = [
    [-1.5, 0.8, 0.5], [1.6, 1, -0.3], [-1.2, -0.9, 0.8],
    [1.4, -0.7, 0.4], [0, 1.5, -0.5], [-0.8, 0.3, 1.2],
    [1, 0.2, -1], [-0.5, -1.3, -0.6], [0.7, -1.2, 0.9],
  ];

  const connections = [
    [0, 4], [1, 4], [2, 5], [3, 6], [5, 0], [6, 1],
    [7, 2], [8, 3], [4, 6], [5, 7],
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#a855f7" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#f97316" />

      <CoreSphere />
      <OrbitalRing radius={1} speed={0.3} axis="y" />
      <OrbitalRing radius={1.3} speed={-0.2} axis="x" />
      <OrbitalRing radius={1.6} speed={0.15} axis="z" />

      {nodes.map((pos, i) => (
        <NetworkNode key={i} position={pos} color={i % 3 === 0 ? "#f97316" : "#a855f7"} />
      ))}

      {connections.map(([a, b], i) => (
        <ConnectionLine key={`line-${i}`} start={nodes[a]} end={nodes[b]} />
      ))}

      {connections.slice(0, 5).map(([a, b], i) => (
        <DataStream key={`stream-${i}`} start={nodes[a]} end={nodes[b]} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function TechModel3D() {
  return (
    <section className="relative page-section overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary text-sm font-semibold tracking-widest uppercase font-display">
                Our Network
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Connected
              <span className="gradient-text"> Intelligence</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our global infrastructure processes millions of data points in real-time,
              connecting enterprises with AI-driven insights across every node of their
              digital ecosystem.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Interact with the model to explore our distributed architecture — a living
              representation of how we orchestrate cloud, AI, and security services
              across continents.
            </p>
          </motion.div>

          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[500px] w-full rounded-2xl overflow-hidden glass-surface glow-border"
          >
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
              <Scene />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
