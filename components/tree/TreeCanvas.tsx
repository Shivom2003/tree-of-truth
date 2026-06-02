"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import gsap from "gsap";

import { TREE_NODES, TreeNode } from "@/lib/treeNodes";

// ------------------------------------------------------------------
// Structured 3D positions — each node has a deliberate place
// ------------------------------------------------------------------
const POSITIONED: Record<string, { x: number; y: number; z: number }> = {
  trunk: { x: 0, y: 0, z: 0 },
  r_vedanta: { x: -3.0, y: -1.8, z: 0.0 },
  r_buddhism: { x: -1.5, y: -1.8, z: -0.8 },
  r_inquiry: { x: 0.0, y: -1.8, z: 1.0 },
  r_shivom: { x: 1.5, y: -1.8, z: 0.6 },
  r_phenomenology: { x: 2.5, y: -1.8, z: -0.4 },
  r_esoteric: { x: 3.5, y: -1.8, z: 0.2 },
  b_neuroscience: { x: -3.2, y: 1.8, z: 0.2 },
  b_philosophy: { x: -1.6, y: 1.8, z: -0.6 },
  b_cognitive: { x: 0.0, y: 1.8, z: 0.8 },
  b_quantum: { x: 1.6, y: 1.8, z: -0.5 },
  b_panpsychism: { x: 2.8, y: 1.8, z: 0.4 },
  b_ai: { x: -1.0, y: 1.8, z: 1.2 },
  f_moksha: { x: 0.0, y: 4.5, z: 0.0 },
  f_yoga: { x: -2.2, y: 3.2, z: 0.3 },
  f_yogaprac: { x: -0.9, y: 3.4, z: 0.5 },
  f_playlists: { x: 0.9, y: 3.4, z: -0.4 },
  f_medicine: { x: 2.0, y: 3.2, z: -0.2 },
  f_meditation: { x: 1.6, y: 3.4, z: 0.6 },
  f_reading: { x: -2.8, y: 3.0, z: -0.3 },
  f_guided: { x: 2.8, y: 3.0, z: 0.2 },
  f_journaling: { x: 1.1, y: 3.2, z: -0.7 },
  rs_advaita: { x: -4.0, y: -2.8, z: 0.4 },
  rs_dvaita: { x: -4.2, y: -2.4, z: -0.5 },
  rs_sankhya: { x: -3.5, y: -2.9, z: 0.8 },
  rs_upanishads: { x: -2.9, y: -2.8, z: -0.6 },
  rs_gitas: { x: -2.3, y: -2.6, z: 0.6 },
  rs_annatta: { x: -1.8, y: -2.8, z: -1.2 },
  rs_sunyata: { x: -0.9, y: -3.3, z: -1.5 },
  rs_rigpa: { x: -0.8, y: -3.0, z: -0.9 },
  rs_reduction: { x: 2.2, y: -2.8, z: -0.3 },
  rs_selfconstruct: { x: 3.0, y: -2.6, z: -0.9 },
  rs_presence: { x: 1.8, y: -2.9, z: 0.5 },
  rs_rebirth: { x: 4.0, y: -2.6, z: 0.6 },
  rs_subtlebody: { x: 4.4, y: -2.3, z: 0.1 },
  rs_astral: { x: 4.2, y: -2.9, z: 0.9 },
  rs_ndes: { x: 4.2, y: -2.8, z: 1.2 },
  rs_enlightenment: { x: 3.1, y: -2.5, z: 1.0 },
  rs_selfinquiry: { x: -0.5, y: -2.8, z: 1.6 },
  rs_netineti: { x: 0.7, y: -2.6, z: 1.8 },
  rs_witness: { x: 0.1, y: -3.4, z: 1.2 },
  rs_whoami: { x: -0.4, y: -3.1, z: 1.4 },
  rs_deepsleep: { x: 1.8, y: -2.6, z: 1.3 },
  rs_sensory: { x: 2.4, y: -2.8, z: 1.0 },
  rs_womb: { x: 1.3, y: -2.9, z: 1.6 },
  rs_memoryloss: { x: 2.0, y: -3.0, z: 1.5 },
  bs_ncc: { x: -4.0, y: 2.6, z: 0.4 },
  bs_dmn: { x: -4.4, y: 2.3, z: -0.1 },
  bs_binding: { x: -3.6, y: 2.8, z: -0.5 },
  bs_global: { x: -3.0, y: 2.6, z: 0.8 },
  bs_hardproblem: { x: -2.2, y: 2.8, z: -0.9 },
  bs_qualia: { x: -1.8, y: 2.6, z: -1.4 },
  bs_zombies: { x: -1.1, y: 2.9, z: -1.0 },
  bs_iit: { x: -0.8, y: 2.6, z: -0.5 },
  bs_embodied: { x: 0.0, y: 2.8, z: 1.4 },
  bs_selfconstruction: { x: 0.7, y: 2.6, z: 1.0 },
  bs_predictive: { x: -0.4, y: 2.9, z: 1.8 },
  bs_observer: { x: 2.0, y: 2.7, z: -0.9 },
  "bs_orch-or": { x: 2.6, y: 2.5, z: -0.5 },
  bs_nonlocality: { x: 1.5, y: 2.8, z: -1.2 },
  bs_interface: { x: 2.3, y: 2.9, z: -1.4 },
  bs_idealism: { x: 3.4, y: 2.7, z: 0.7 },
  bs_goff: { x: 4.0, y: 2.4, z: 0.3 },
  bs_chalmers_pan: { x: 3.2, y: 2.5, z: 1.0 },
  bs_faggin_pan: { x: 3.8, y: 2.8, z: 0.9 },
  bs_learning: { x: -1.5, y: 2.7, z: 1.6 },
  bs_experience: { x: -0.7, y: 2.5, z: 1.9 },
  l_shankaracharya: { x: -4.2, y: -1.6, z: 0.4 },
  l_vivekananda: { x: -3.8, y: -1.4, z: -0.3 },
  l_sarvapriyananda: { x: -3.4, y: -1.6, z: 0.7 },
  l_kanojia: { x: -2.8, y: 1.5, z: 0.5 },
  l_ramana: { x: 0.3, y: -1.5, z: 1.4 },
  l_nisargadatta: { x: -0.4, y: -1.5, z: 1.3 },
  l_spira: { x: 0.5, y: -1.2, z: 1.4 },
  l_lucille: { x: -0.1, y: -1.6, z: 1.7 },
  l_buddha: { x: -1.9, y: -1.5, z: -1.2 },
  l_nagarjuna: { x: -1.3, y: -1.8, z: -1.5 },
  l_patanjali: { x: 3.9, y: -1.5, z: 0.2 },
  l_ramakrishna: { x: 3.6, y: -1.6, z: 0.6 },
  l_metzinger: { x: 2.8, y: -1.5, z: -0.5 },
  l_chalmers: { x: -2.0, y: 1.5, z: -0.8 },
  l_koch: { x: -3.6, y: 1.5, z: 0.3 },
  l_faggin: { x: 2.0, y: 1.5, z: -0.7 },
  l_hoffman: { x: 1.5, y: 1.4, z: -0.8 },
  l_kastrup: { x: 3.3, y: 1.5, z: 0.5 },
  l_goff: { x: 3.8, y: 1.4, z: 0.2 },
  l_chopra: { x: 2.6, y: 1.5, z: 0.7 },
  l_krishna: { x: -2.6, y: -1.5, z: 0.3 },
  l_jesus: { x: 2.3, y: -1.5, z: 0.7 },
  l_papaji: { x: -0.3, y: -1.7, z: 0.6 },
  l_aurobindo: { x: -4.8, y: -2.6, z: 0.5 },
  l_williamjames: { x: 2.5, y: -1.3, z: 0.5 },
  l_laotzu: { x: -1.1, y: -1.5, z: -0.7 },
  l_krishnamurti: { x: -0.1, y: -1.4, z: 0.9 },
  l_watts: { x: 0.6, y: -1.3, z: 0.8 },
  l_bohm: { x: 1.7, y: 1.3, z: -0.4 },
};

const CATEGORY_COLOR: Record<string, string> = {
  trunk: "#ffffff",
  roots: "#ffd700",
  branches: "#60a5fa",
  fruit: "#fb923c",
  leaves: "#a3e635",
};

// Major nodes that get extra decorative ring
const MAJOR_NODES = new Set([
  "trunk",
  "r_vedanta", "r_buddhism", "r_inquiry", "r_shivom", "r_phenomenology", "r_esoteric",
  "b_neuroscience", "b_philosophy", "b_cognitive", "b_quantum", "b_panpsychism", "b_ai",
  "f_moksha", "f_yoga", "f_meditation",
]);

type NodeEntry = {
  group: THREE.Group;
  core: THREE.Mesh;
  coreMat: THREE.MeshPhongMaterial;
  innerGem?: THREE.Mesh;
  innerGemMat?: THREE.MeshPhongMaterial;
  innerGlowMat: THREE.MeshBasicMaterial;
  outerCoronaMat: THREE.MeshBasicMaterial;
  nodeData: TreeNode & { x: number; y: number; z: number };
};

const getNodeColor = (node: TreeNode): string => {
  if (node.id === "trunk") return "#ffffff";
  if (node.category === "fruit") {
    if (node.id === "f_moksha") return "#ffd700"; // Moksha/Nirvana is gold
    return "#fb923c"; // Orange for other fruits
  }
  let current: TreeNode | undefined = node;
  while (current && current.parentId && current.parentId !== "trunk") {
    const parent = TREE_NODES.find((n) => n.id === current?.parentId);
    if (!parent) break;
    current = parent;
  }
  const familyColors: Record<string, string> = {
    // Roots (6 main — Warm/Earthy/Mystic Tones)
    r_vedanta: "#e11d48", // Crimson Red
    r_buddhism: "#d946ef", // Orchid Purple
    r_inquiry: "#0284c7", // Ocean Blue
    r_shivom: "#059669", // Forest Green
    r_phenomenology: "#d1d5db", // Silver (reduced blue/purple dominance)
    r_esoteric: "#0d9488", // Deep Teal

    // Branches (6 main — Cool/Scientific/Mental Tones)
    b_neuroscience: "#d1d5db", // Silver (reduced blue/purple dominance)
    b_philosophy: "#6366f1", // Indigo
    b_cognitive: "#8b5cf6", // Deep Amethyst
    b_quantum: "#34d399", // Mint Green (Fixed clashing with fruits)
    b_panpsychism: "#f43f5e", // Vibrant Coral
    b_ai: "#0ea5e9", // Cyan Blue
  };
  return familyColors[current.id] ?? node.color;
};

export default function TreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const targetZRef = useRef(10.5);
  const [hoveredNode, setHoveredNodeState] = useState<TreeNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [debugError, setDebugError] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  const hoveredNodeRef = useRef<TreeNode | null>(null);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    let animationId: number;
    let resizeObserver: ResizeObserver;
    let handleMouseMove: (e: MouseEvent) => void;
    let handleMouseDown: (e: MouseEvent) => void;
    let handleMouseUp: (e: MouseEvent) => void;
    let handleWheel: (e: WheelEvent) => void;
    let handleTouchStart: (e: TouchEvent) => void;
    let handleTouchMove: (e: TouchEvent) => void;
    let handleTouchEnd: (e: TouchEvent) => void;

    // Panning & dragging state
    let isMouseDown = false;
    let hasDragged = false;
    let mouseDownXY = { x: 0, y: 0 };
    let cameraStartXY = { x: 0, y: 0 };

    try {
      let width = container.clientWidth || window.innerWidth || 800;
      let height = container.clientHeight || window.innerHeight || 600;
      const isMobile = width < 768;
      const startZ = isMobile ? 16.5 : 10.5;
      const maxZ = isMobile ? 22.0 : 15.0;

      targetZRef.current = startZ;

      // ── Scene ──────────────────────────────────────────────────────
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2("#05060b", 0.033);

      // ── Camera ─────────────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200);
      camera.position.set(0, -0.3, startZ);

      // ── Renderer ───────────────────────────────────────────────────
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // ── Lights ─────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight("#0a0f22", 0.7));
      const pointLight = new THREE.PointLight("#ffd700", 3.0, 40);
      pointLight.position.set(0, 5, 6);
      scene.add(pointLight);
      const goldLight = new THREE.DirectionalLight("#d4af37", 1.8);
      goldLight.position.set(-5, 5, 2);
      scene.add(goldLight);
      const blueLight = new THREE.PointLight("#4060ff", 1.0, 25);
      blueLight.position.set(4, 3, -2);
      scene.add(blueLight);

      // ── Star field ─────────────────────────────────────────────────
      const starsGeo = new THREE.BufferGeometry();
      const starPos = new Float32Array(2000 * 3);
      for (let i = 0; i < 2000 * 3; i += 3) {
        starPos[i] = (Math.random() - 0.5) * 32;
        starPos[i + 1] = (Math.random() - 0.5) * 24;
        starPos[i + 2] = (Math.random() - 0.5) * 14 - 3;
      }
      starsGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({
        color: "#f3e5ab", size: 0.025, transparent: true, opacity: 0.65,
        blending: THREE.AdditiveBlending,
      })));

      // ── Decorative orbital rings ────────────────────────────────────
      const ringBase = new THREE.MeshBasicMaterial({
        color: "#ffe57f", // Lighter bright gold
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.22, // Increased opacity to prevent camouflaging
        blending: THREE.AdditiveBlending,
      });
      const r1 = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.23, 80), ringBase);
      r1.rotation.x = Math.PI / 2;
      r1.position.y = -1.2; // Shift down with constellation
      scene.add(r1);
      const r2 = new THREE.Mesh(new THREE.RingGeometry(5.2, 5.24, 80), ringBase.clone());
      r2.rotation.x = Math.PI / 2.2;
      r2.rotation.y = Math.PI / 5;
      r2.position.y = -1.2; // Shift down with constellation
      scene.add(r2);

      // ── Node group + line group (rotate together) ───────────────────
      const nodeGroup = new THREE.Group();
      const lineGroup = new THREE.Group();
      nodeGroup.position.y = -1.2; // Bring constellation further towards the bottom
      lineGroup.position.y = -1.2; // Bring connection lines further towards the bottom
      scene.add(nodeGroup);
      scene.add(lineGroup);

      // ── Build nodes ─────────────────────────────────────────────────
      const nodeEntries: NodeEntry[] = [];
      const allLineMats: THREE.LineBasicMaterial[] = [];



      TREE_NODES.forEach((node) => {
        const pos = POSITIONED[node.id] ?? { x: node.x, y: node.y, z: node.z };
        const resolvedColor = getNodeColor(node);
        const col = new THREE.Color(resolvedColor);
        const rawColor = resolvedColor;

        const group = new THREE.Group();
        group.position.set(pos.x, pos.y, pos.z);

        const isMoksha = node.id === "f_moksha";

        // Core Outer Shield: smooth sphere — glassy, semi-transparent
        const coreMat = new THREE.MeshPhongMaterial({
          color: isMoksha ? new THREE.Color("#ffffff") : col,
          emissive: isMoksha ? new THREE.Color("#ffd700") : col,
          emissiveIntensity: isMoksha ? 1.00 : 0.15,
          shininess: 200,
          specular: new THREE.Color("#ffffff"),
          transparent: true,
          opacity: isMoksha ? 0.75 : 0.45,
          depthWrite: true,
        });
        const core = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), coreMat);
        core.userData.nodeId = node.id;
        group.add(core);

        // Core Inner Gem: smooth solid inner sphere core
        const innerGemMat = new THREE.MeshPhongMaterial({
          color: isMoksha ? new THREE.Color("#ffffff") : col,
          emissive: isMoksha ? new THREE.Color("#ffd700") : col,
          emissiveIntensity: isMoksha ? 2.20 : 0.85,
          shininess: 80,
          specular: new THREE.Color("#ffffff"),
          transparent: false,
        });
        const innerGem = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), innerGemMat);
        innerGem.userData.isInnerGem = true;
        group.add(innerGem);

        // Wireframe edges overlay — matches the outer sphere shape
        const edgeMat = new THREE.LineBasicMaterial({
          color: isMoksha ? new THREE.Color("#ffd700") : new THREE.Color(rawColor).lerp(new THREE.Color("#ffffff"), 0.55),
          transparent: true,
          opacity: isMoksha ? 0.40 : 0.25,
          blending: THREE.AdditiveBlending,
        });
        const wireframe = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.SphereGeometry(0.56, 16, 16)),
          edgeMat
        );
        wireframe.userData.isWireframe = true;
        group.add(wireframe);

        // Inner glow sphere
        const innerGlowMat = new THREE.MeshBasicMaterial({
          color: isMoksha ? new THREE.Color("#ffd700") : col,
          transparent: true,
          opacity: isMoksha ? 0.45 : 0.18,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        group.add(new THREE.Mesh(new THREE.SphereGeometry(1.18, 16, 16), innerGlowMat));

        // Outer corona
        const outerCoronaMat = new THREE.MeshBasicMaterial({
          color: isMoksha ? new THREE.Color("#ffd700") : col,
          transparent: true,
          opacity: isMoksha ? 0.22 : 0.08,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        group.add(new THREE.Mesh(new THREE.SphereGeometry(1.72, 10, 10), outerCoronaMat));

        // Special additional gold star halo for Moksha
        if (isMoksha) {
          const mokshaHaloMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color("#ffd700"),
            transparent: true,
            opacity: 0.28,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const mokshaHalo = new THREE.Mesh(new THREE.SphereGeometry(2.5, 16, 16), mokshaHaloMat);
          group.add(mokshaHalo);
        }

        // Orbital Ring Systems
        if (MAJOR_NODES.has(node.id)) {
          // Major nodes get two thin intersecting rings rotating on different axes (dual-axis gyro)
          const ringMat = new THREE.MeshBasicMaterial({
            color: col,
            transparent: true,
            opacity: 0.24,
            blending: THREE.AdditiveBlending,
            wireframe: true,
          });
          const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.02, 6, 32), ringMat);
          ring1.userData.isRing1 = true;
          ring1.rotation.x = Math.random() * Math.PI;
          ring1.rotation.y = Math.random() * Math.PI;
          group.add(ring1);

          const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.02, 6, 32), ringMat);
          ring2.userData.isRing2 = true;
          ring2.rotation.x = Math.random() * Math.PI;
          ring2.rotation.y = Math.random() * Math.PI;
          group.add(ring2);
        } else {
          // Minor nodes get a single thin orbital ring rotating slowly
          const ringMat = new THREE.MeshBasicMaterial({
            color: col,
            transparent: true,
            opacity: 0.12,
            blending: THREE.AdditiveBlending,
            wireframe: true,
          });
          const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.012, 4, 24), ringMat);
          ring.userData.isMinorRing = true;
          ring.rotation.x = Math.random() * Math.PI;
          ring.rotation.y = Math.random() * Math.PI;
          group.add(ring);
        }

        // Trunk special: extra outer corona
        if (node.id === "trunk") {
          const trunkHaloMat = new THREE.MeshBasicMaterial({
            color: "#ffffff",
            transparent: true,
            opacity: 0.04,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          group.add(new THREE.Mesh(new THREE.SphereGeometry(2.4, 8, 8), trunkHaloMat));
          coreMat.emissiveIntensity = 0.50; // Keep outer core soft
          innerGemMat.emissiveIntensity = 1.25; // Keep inner gem very bright
        }

        group.scale.setScalar(node.size);
        nodeGroup.add(group);

        nodeEntries.push({
          group, core, coreMat, innerGem, innerGemMat, innerGlowMat, outerCoronaMat,
          nodeData: { ...node, x: pos.x, y: pos.y, z: pos.z },
        });
      });

      // ── Build connection lines ──────────────────────────────────────
      const mkLineMat = (color: string, opacity: number) => {
        const m = new THREE.LineBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
        });
        allLineMats.push(m);
        return m;
      };

      const addCurve = (
        a: { x: number; y: number; z: number },
        b: { x: number; y: number; z: number },
        mat: THREE.LineBasicMaterial,
      ) => {
        const v1 = new THREE.Vector3(a.x, a.y, a.z);
        const v2 = new THREE.Vector3(b.x, b.y, b.z);
        const mid = v1.clone().add(v2).multiplyScalar(0.5);
        mid.z += (Math.random() - 0.5) * 0.35;
        const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
        lineGroup.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(22)),
          mat,
        ));
      };

      TREE_NODES.forEach((node) => {
        if (!node.parentId) return;
        const parent = TREE_NODES.find((n) => n.id === node.parentId);
        if (!parent) return;
        const nPos = POSITIONED[node.id] ?? { x: node.x, y: node.y, z: node.z };
        const pPos = POSITIONED[parent.id] ?? { x: parent.x, y: parent.y, z: parent.z };
        const resolvedColor = getNodeColor(node);
        addCurve(pPos, nPos, mkLineMat(resolvedColor, 0.36));
      });

      // trunk → direct children
      const trunkPos = POSITIONED["trunk"];
      TREE_NODES.forEach((node) => {
        if (node.parentId !== "trunk") return;
        const nPos = POSITIONED[node.id] ?? { x: node.x, y: node.y, z: node.z };
        const resolvedColor = getNodeColor(node);
        addCurve(trunkPos, nPos, mkLineMat(resolvedColor, 0.36));
      });

      // ── Raycaster ─────────────────────────────────────────────────
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const coreTargets = nodeEntries.map((e) => e.core);

      handleMouseMove = (event: MouseEvent) => {
        const dom = renderer?.domElement;
        if (!dom) return;
        const rect = dom.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Panning logic on drag
        if (isMouseDown && !isTransitioningRef.current) {
          const dx = event.clientX - mouseDownXY.x;
          const dy = event.clientY - mouseDownXY.y;
          if (Math.sqrt(dx * dx + dy * dy) > 5) {
            hasDragged = true;
            const sens = camera.position.z * 0.0016;
            camera.position.x = Math.max(-5.5, Math.min(5.5, cameraStartXY.x - dx * sens));
            camera.position.y = Math.max(-5.5, Math.min(4.0, cameraStartXY.y + dy * sens));

            // Hide tooltip/glow while panning
            if (hoveredNodeRef.current) {
              document.body.style.cursor = "default";
              hoveredNodeRef.current = null;
              setHoveredNodeState(null);
              nodeEntries.forEach((e) => {
                gsap.to(e.group.scale, {
                  x: e.nodeData.size, y: e.nodeData.size, z: e.nodeData.size, duration: 0.22,
                });
                e.coreMat.emissiveIntensity = 0.15;
                if (e.innerGemMat) e.innerGemMat.emissiveIntensity = 0.85;
                e.innerGlowMat.opacity = 0.18;
                e.outerCoronaMat.opacity = 0.08;
              });
            }
            return;
          }
        }

        let x = event.clientX + 18;
        let y = event.clientY + 18;
        const tooltipW = 280;
        const tooltipH = 165;

        // Flip to left of cursor if overflowing right edge
        if (x + tooltipW > window.innerWidth) {
          x = event.clientX - tooltipW - 18;
        }
        // Flip to above cursor if overflowing bottom edge
        if (y + tooltipH > window.innerHeight) {
          y = event.clientY - tooltipH - 18;
        }

        // Clamp to screen boundaries
        x = Math.max(10, Math.min(window.innerWidth - tooltipW - 10, x));
        y = Math.max(10, Math.min(window.innerHeight - tooltipH - 10, y));

        setTooltipPos({ x, y });
        if (isTransitioningRef.current) return;

        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(coreTargets, false);

        if (hits.length > 0) {
          const entry = nodeEntries.find((e) => e.core === hits[0].object);
          if (!entry) return;
          const { nodeData } = entry;

          if (hoveredNodeRef.current?.id !== nodeData.id) {
            document.body.style.cursor = "pointer";
            hoveredNodeRef.current = nodeData;
            setHoveredNodeState(nodeData);

            nodeEntries.forEach((e) => {
              if (e.nodeData.id === nodeData.id) {
                gsap.to(e.group.scale, {
                  x: nodeData.size * 1.6, y: nodeData.size * 1.6, z: nodeData.size * 1.6,
                  duration: 0.22,
                });
                e.coreMat.emissiveIntensity = 0.45;
                if (e.innerGemMat) e.innerGemMat.emissiveIntensity = 1.8;
                e.innerGlowMat.opacity = 0.50;
                e.outerCoronaMat.opacity = 0.28;
              } else {
                gsap.to(e.group.scale, {
                  x: e.nodeData.size, y: e.nodeData.size, z: e.nodeData.size,
                  duration: 0.22,
                });
                e.coreMat.emissiveIntensity = 0.15;
                if (e.innerGemMat) e.innerGemMat.emissiveIntensity = 0.85;
                e.innerGlowMat.opacity = 0.18;
                e.outerCoronaMat.opacity = 0.08;
              }
            });
          }
        } else {
          if (hoveredNodeRef.current) {
            document.body.style.cursor = "default";
            hoveredNodeRef.current = null;
            setHoveredNodeState(null);
            nodeEntries.forEach((e) => {
              gsap.to(e.group.scale, {
                x: e.nodeData.size, y: e.nodeData.size, z: e.nodeData.size, duration: 0.22,
              });
              e.coreMat.emissiveIntensity = 0.15;
              if (e.innerGemMat) e.innerGemMat.emissiveIntensity = 0.85;
              e.innerGlowMat.opacity = 0.18;
              e.outerCoronaMat.opacity = 0.08;
            });
          }
        }
      };

      handleMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return; // only left click
        if (!container.contains(e.target as Node)) return;
        if ((e.target as Element).closest("button,a,input,select,div.glass-panel,div.overflow-y-auto")) return;

        mouseDownXY = { x: e.clientX, y: e.clientY };
        cameraStartXY = { x: camera.position.x, y: camera.position.y };
        isMouseDown = true;
        hasDragged = false;
      };

      handleMouseUp = (e: MouseEvent) => {
        if (!isMouseDown) return;
        isMouseDown = false;
        if (hasDragged) return; // ignore click if panned
        if (isTransitioningRef.current) return;

        const dom = renderer.domElement;
        const rect = dom.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(coreTargets, false);
        if (!hits.length) return;

        const entry = nodeEntries.find((e) => e.core === hits[0].object);
        if (!entry) return;

        isTransitioningRef.current = true;
        hoveredNodeRef.current = null;
        setHoveredNodeState(null);
        document.body.style.cursor = "default";

        const { nodeData } = entry;

        // ── Node burst effect ─────────────────────────────────────────
        gsap.to(entry.group.scale, {
          x: nodeData.size * 2.8, y: nodeData.size * 2.8, z: nodeData.size * 2.8,
          duration: 0.5, ease: "power2.out",
        });
        entry.coreMat.emissiveIntensity = 1.2;
        if (entry.innerGemMat) entry.innerGemMat.emissiveIntensity = 3.0;
        entry.innerGlowMat.opacity = 0.70;
        entry.outerCoronaMat.opacity = 0.45;

        // Fade all other nodes + lines
        nodeEntries.forEach((e) => {
          if (e.nodeData.id === nodeData.id) return;
          gsap.to(e.coreMat, { opacity: 0, duration: 0.85, onStart: () => { e.coreMat.transparent = true; } });
          if (e.innerGemMat) {
            const gemMat = e.innerGemMat;
            gsap.to(gemMat, { opacity: 0, duration: 0.85, onStart: () => { gemMat.transparent = true; } });
          }
          gsap.to(e.innerGlowMat, { opacity: 0, duration: 0.70 });
          gsap.to(e.outerCoronaMat, { opacity: 0, duration: 0.60 });
        });
        allLineMats.forEach((m) => gsap.to(m, { opacity: 0, duration: 0.75 }));

        // ── Smooth Dolly + Truck Sliding Zoom Transition — No Camera Rotation ────────────
        // Get the node's CURRENT world position (accounting for nodeGroup rotation)
        const nodeWorldPos = new THREE.Vector3();
        entry.group.getWorldPosition(nodeWorldPos);

        const startPos = camera.position.clone();

        // End position: align camera X and Y with the node's world X and Y, and zoom in along Z
        const approachDist = nodeData.size * 2.2 + 1.4;
        const endPos = new THREE.Vector3(
          nodeWorldPos.x,
          nodeWorldPos.y,
          nodeWorldPos.z + approachDist
        );
        targetZRef.current = endPos.z;

        // Keep camera orientation perfectly locked (looking straight down -Z, identity rotation)
        // No slerping or lookAt calculation. The camera remains perfectly horizontal.
        const prog = { t: 0 };
        gsap.to(prog, {
          t: 1,
          duration: 1.7,
          ease: "power3.inOut",
          onUpdate: () => {
            camera.position.lerpVectors(startPos, endPos, prog.t);
          },
          onComplete: () => router.push(nodeData.path),
        });
      };

      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      let initialPinchDistance = 0;
      let initialCameraZ = startZ;

      handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 0) return;
        
        if (e.touches.length === 2) {
          initialPinchDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          initialCameraZ = camera.position.z;
          isMouseDown = false;
        } else if (e.touches.length === 1) {
          const touch = e.touches[0];
          mouseDownXY = { x: touch.clientX, y: touch.clientY };
          cameraStartXY = { x: camera.position.x, y: camera.position.y };
          isMouseDown = true;
          hasDragged = false;
        }
      };

      handleTouchMove = (e: TouchEvent) => {
        if (isTransitioningRef.current) return;
        
        if (e.touches.length === 2 && initialPinchDistance > 0) {
          if (e.cancelable) e.preventDefault();
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          if (dist > 5) {
            const factor = initialPinchDistance / dist;
            targetZRef.current = Math.max(5.5, Math.min(maxZ, initialCameraZ * factor));
            gsap.to(camera.position, {
              z: targetZRef.current,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        } else if (e.touches.length === 1 && isMouseDown) {
          const touch = e.touches[0];
          const dx = touch.clientX - mouseDownXY.x;
          const dy = touch.clientY - mouseDownXY.y;
          if (Math.sqrt(dx * dx + dy * dy) > 5) {
            hasDragged = true;
            const sens = camera.position.z * 0.0016;
            camera.position.x = Math.max(-5.5, Math.min(5.5, cameraStartXY.x - dx * sens));
            camera.position.y = Math.max(-5.5, Math.min(4.0, cameraStartXY.y + dy * sens));

            if (hoveredNodeRef.current) {
              hoveredNodeRef.current = null;
              setHoveredNodeState(null);
              nodeEntries.forEach((e) => {
                gsap.to(e.group.scale, {
                  x: e.nodeData.size, y: e.nodeData.size, z: e.nodeData.size, duration: 0.22,
                });
                e.coreMat.emissiveIntensity = 0.15;
                if (e.innerGemMat) e.innerGemMat.emissiveIntensity = 0.85;
                e.innerGlowMat.opacity = 0.18;
                e.outerCoronaMat.opacity = 0.08;
              });
            }
          }
        }
      };

      handleTouchEnd = (e: TouchEvent) => {
        initialPinchDistance = 0;
        if (!isMouseDown) return;
        isMouseDown = false;
        if (hasDragged) return;
        if (isTransitioningRef.current) return;
        if (e.changedTouches.length === 0) return;

        const touch = e.changedTouches[0];
        const dom = renderer.domElement;
        const rect = dom.getBoundingClientRect();
        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(coreTargets, false);
        if (!hits.length) return;

        const entry = nodeEntries.find((e) => e.core === hits[0].object);
        if (!entry) return;

        isTransitioningRef.current = true;
        hoveredNodeRef.current = null;
        setHoveredNodeState(null);

        const { nodeData } = entry;

        gsap.to(entry.group.scale, {
          x: nodeData.size * 2.8, y: nodeData.size * 2.8, z: nodeData.size * 2.8,
          duration: 0.5, ease: "power2.out",
        });
        entry.coreMat.emissiveIntensity = 1.2;
        if (entry.innerGemMat) entry.innerGemMat.emissiveIntensity = 3.0;
        entry.innerGlowMat.opacity = 0.70;
        entry.outerCoronaMat.opacity = 0.45;

        nodeEntries.forEach((e) => {
          if (e.nodeData.id === nodeData.id) return;
          gsap.to(e.coreMat, { opacity: 0, duration: 0.85, onStart: () => { e.coreMat.transparent = true; } });
          if (e.innerGemMat) {
            const gemMat = e.innerGemMat;
            gsap.to(gemMat, { opacity: 0, duration: 0.85, onStart: () => { gemMat.transparent = true; } });
          }
          gsap.to(e.innerGlowMat, { opacity: 0, duration: 0.70 });
          gsap.to(e.outerCoronaMat, { opacity: 0, duration: 0.60 });
        });
        allLineMats.forEach((m) => gsap.to(m, { opacity: 0, duration: 0.75 }));

        const nodeWorldPos = new THREE.Vector3();
        entry.group.getWorldPosition(nodeWorldPos);

        const startPos = camera.position.clone();
        const approachDist = nodeData.size * 2.2 + 1.4;
        const endPos = new THREE.Vector3(
          nodeWorldPos.x,
          nodeWorldPos.y,
          nodeWorldPos.z + approachDist
        );
        targetZRef.current = endPos.z;

        const prog = { t: 0 };
        gsap.to(prog, {
          t: 1,
          duration: 1.7,
          ease: "power3.inOut",
          onUpdate: () => {
            camera.position.lerpVectors(startPos, endPos, prog.t);
          },
          onComplete: () => router.push(nodeData.path),
        });
      };

      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });

      handleWheel = (event: WheelEvent) => {
        if (isTransitioningRef.current) return;
        if (!container.contains(event.target as Node)) return;
        if ((event.target as Element).closest("button,a,input,select,div.glass-panel,div.overflow-y-auto")) return;

        event.preventDefault();
        
        const zoomSpeed = 0.008;
        targetZRef.current += event.deltaY * zoomSpeed;
        targetZRef.current = Math.max(5.5, Math.min(maxZ, targetZRef.current));
        
        let targetX = camera.position.x;
        let targetY = camera.position.y;
        
        const dz = targetZRef.current - camera.position.z;
        const tempRaycaster = new THREE.Raycaster();
        tempRaycaster.setFromCamera(mouse, camera);
        const D = tempRaycaster.ray.direction;
        
        if (event.deltaY < 0) {
          // Zoom towards cursor
          if (Math.abs(D.z) > 0.0001) {
            targetX = camera.position.x + (dz / D.z) * D.x;
            targetY = camera.position.y + (dz / D.z) * D.y;
          }
        } else {
          // Zooming out: gently slide back towards center
          if (Math.abs(D.z) > 0.0001) {
            const rawTargetX = camera.position.x + (dz / D.z) * D.x;
            const rawTargetY = camera.position.y + (dz / D.z) * D.y;
            
            // As we zoom out, slide back to center (0, -0.3) based on zoom depth
            const tCenter = (targetZRef.current - 5.5) / (maxZ - 5.5);
            targetX = THREE.MathUtils.lerp(rawTargetX, 0, tCenter * 0.85);
            targetY = THREE.MathUtils.lerp(rawTargetY, -0.3, tCenter * 0.85);
          }
        }
        
        targetX = Math.max(-5.5, Math.min(5.5, targetX));
        targetY = Math.max(-5.5, Math.min(4.0, targetY));
        
        gsap.to(camera.position, {
          x: targetX,
          y: targetY,
          z: targetZRef.current,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      window.addEventListener("wheel", handleWheel, { passive: false });

      // ── Animation loop ─────────────────────────────────────────────
      const clock = new THREE.Clock();

      const animate = () => {
        try {
          animationId = requestAnimationFrame(animate);
          const t = clock.getElapsedTime();

          if (!isTransitioningRef.current) {
            // Very gentle rotation — readable but alive
            nodeGroup.rotation.y = t * 0.050;
            lineGroup.rotation.y = t * 0.050;
            nodeGroup.rotation.x = Math.sin(t * 0.10) * 0.038;
            lineGroup.rotation.x = Math.sin(t * 0.10) * 0.038;

            nodeEntries.forEach(({ group, core, innerGem, outerCoronaMat, nodeData }, i) => {
              if (hoveredNodeRef.current?.id !== nodeData.id) {
                // Subtle breathing pulse
                const pulse = 1 + Math.sin(t * 1.55 + i * 0.73) * 0.052;
                group.scale.setScalar(nodeData.size * pulse);
                // Breathing corona
                const baseCoronaOpacity = nodeData.id === "f_moksha" ? 0.22 : 0.08;
                outerCoronaMat.opacity = baseCoronaOpacity + Math.sin(t * 1.05 + i * 0.9) * (baseCoronaOpacity * 0.45);
              }
              // Rotate outer core slowly
              core.rotation.y += 0.0035;
              core.rotation.x += 0.0025;

              // Rotate inner gem in the opposite direction and faster
              if (innerGem) {
                innerGem.rotation.y -= 0.012;
                innerGem.rotation.x -= 0.008;
              }

              // Spin decorative rings at different speeds
              group.children.forEach((child) => {
                const mesh = child as THREE.Mesh;
                if (mesh.userData?.isRing1) {
                  mesh.rotation.z += 0.008;
                  mesh.rotation.x += 0.005;
                } else if (mesh.userData?.isRing2) {
                  mesh.rotation.z -= 0.005;
                  mesh.rotation.y += 0.007;
                } else if (mesh.userData?.isMinorRing) {
                  mesh.rotation.z += 0.006;
                  mesh.rotation.x += 0.003;
                } else if (mesh.userData?.isWireframe) {
                  mesh.rotation.copy(core.rotation);
                }
              });
            });
          }

          renderer.render(scene, camera);
        } catch (err: unknown) {
          setDebugError("Loop error: " + (err instanceof Error ? err.message : String(err)));
          cancelAnimationFrame(animationId);
        }
      };
      animate();

      // ── Resize ────────────────────────────────────────────────────
      resizeObserver = new ResizeObserver(() => {
        const w = container.clientWidth || window.innerWidth || 800;
        const h = container.clientHeight || window.innerHeight || 600;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        setContainerSize({ w, h });
      });
      resizeObserver.observe(container);
      setContainerSize({ w: width, h: height });

    } catch (err: unknown) {
      setDebugError("Init error: " + (err instanceof Error ? err.message : String(err)));
    }

    return () => {
      try {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      } catch (_) { /* ignore */ }
      resizeObserver?.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      renderer?.dispose();
      try {
        if (container && renderer?.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      } catch (_) { /* ignore */ }
    };
  }, [router]);

  return (
    <div className="absolute inset-0 w-full h-full select-none overflow-hidden z-10">
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-default" />

      {/* Status pill — top LEFT so it never overlaps the moon (top RIGHT) */}
      <div className="absolute top-4 left-4 text-[9px] uppercase tracking-widest font-mono z-50 flex flex-col gap-1 items-start pointer-events-none select-none px-2.5 py-2 rounded border bg-[#05060b]/80 border-gold-matte/10 text-gold-matte/50">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
          Constellation
        </span>
        <span>{containerSize.w}×{containerSize.h}</span>
      </div>

      {debugError && (
        <div className="absolute top-4 left-4 bg-red-900/90 text-white text-xs p-3 rounded-lg z-50 border border-red-500 max-w-md">
          <strong>Error:</strong> {debugError}
        </div>
      )}

      {/* Hover tooltip */}
      {hoveredNode && (
        <div
          className="fixed pointer-events-none rounded-xl p-4 shadow-2xl max-w-xs z-50 border transition-opacity duration-150 bg-[#0a0d1a]/92 backdrop-blur-md border-gold-matte/30 text-gold-light"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <div className="text-[9px] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1.5 text-gold-matte/70">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: getNodeColor(hoveredNode) }}
            />
            {hoveredNode.category}
          </div>
          <div className="font-serif text-base mb-1.5 text-gold-bright">
            {hoveredNode.name}
          </div>
          <p className="text-[11px] leading-relaxed italic border-t pt-1.5 text-gold-light/90 border-gold-matte/10">
            &ldquo;{hoveredNode.question}&rdquo;
          </p>
          <div className="mt-2 text-[8px] font-semibold tracking-wider uppercase flex items-center gap-1 text-gold-matte/55">
            <span className="w-1 h-1 rounded-full bg-green-400 animate-ping" />
            Click to traverse node
          </div>
        </div>
      )}
    </div>
  );
}
