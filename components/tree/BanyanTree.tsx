"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { TREE_NODES, TreeNode } from "@/lib/treeNodes";
import { Sparkles } from "lucide-react";
export default function BanyanTree() {
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState<TreeNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = true;

  // Helper to determine the main root family ID of a node (r_vedanta, r_buddhism, etc.)
  const getRootFamilyId = (nodeId: string): string | null => {
    let current = TREE_NODES.find((n) => n.id === nodeId);
    if (!current) return null;
    if (current.id.startsWith("r_") && current.category === "roots") {
      return current.id;
    }
    let parentId = current.parentId;
    while (parentId) {
      if (parentId.startsWith("r_")) {
        const p = TREE_NODES.find((n) => n.id === parentId);
        if (p && p.category === "roots") return parentId;
      }
      const p = TREE_NODES.find((n) => n.id === parentId);
      parentId = p?.parentId;
    }
    return null;
  };

  // ViewBox: 1200 x 1000.
  // Center X is 600. Center Y of trunk base is 580 (shifted down to prevent top navbar collision).
  // We scale coordinates: 25% wider horizontally, 6% tighter vertically (0.94), shifted down.
  const getX = (x: number, nodeId?: string) => {
    if (!nodeId) return 600 + (x - 500) * 1.25;
    const node = TREE_NODES.find((n) => n.id === nodeId);
    
    // Determine if it is under the roots subtree
    const familyRootId = getRootFamilyId(nodeId);
    if (familyRootId) {
      const familyRoot = TREE_NODES.find((n) => n.id === familyRootId);
      if (familyRoot) {
        // Main root families concentrated horizontally with factor 1.65 (slightly spreaded)
        const familyRootX = 600 + (familyRoot.x2d - 500) * 1.65;
        const offsetX = x - familyRoot.x2d;
        
        let nudge = 0;
        // Specific visual offsets to resolve all overlaps
        if (nodeId === "l_shankaracharya") nudge = -35;
        else if (nodeId === "l_vivekananda") nudge = -25;
        else if (nodeId === "l_sarvapriyananda") nudge = -40; // Push left to avoid Gautama Buddha
        else if (nodeId === "l_buddha") nudge = 30; // Push right to avoid Sarvapriyananda
        else if (nodeId === "l_nagarjuna") nudge = -25; // Push left to avoid Ramana Maharshi
        else if (nodeId === "l_ramana") nudge = -15; // Push right slightly to avoid Nagarjuna
        else if (nodeId === "l_nisargadatta") nudge = -20;
        else if (nodeId === "l_spira") nudge = 25;
        else if (nodeId === "l_lucille") nudge = 20; // Spread out Inquiry thinkers
        else if (nodeId === "l_metzinger") nudge = -50; // Push left to avoid Rebirth & Bardo
        else if (nodeId === "l_patanjali") nudge = -20;
        else if (nodeId === "l_ramakrishna") nudge = 20;
        
        // Sub-roots
        else if (nodeId === "rs_dvaita") nudge = -15;
        else if (nodeId === "rs_sankhya") nudge = -20;
        else if (nodeId === "rs_upanishads") nudge = 15;
        else if (nodeId === "rs_gitas") nudge = 5; // Reduced horizontal offset
        else if (nodeId === "rs_annatta") nudge = -20;
        else if (nodeId === "rs_rigpa") nudge = -15; // Push left to avoid Neti Neti
        else if (nodeId === "rs_selfinquiry") nudge = -15;
        else if (nodeId === "rs_netineti") nudge = 20; // Push right to avoid Rigpa
        else if (nodeId === "rs_witness") nudge = 15;
        else if (nodeId === "rs_whoami") nudge = 25;
        else if (nodeId === "rs_deepsleep") nudge = -5;
        else if (nodeId === "rs_sensory") nudge = -5;
        else if (nodeId === "rs_womb") nudge = 15;
        else if (nodeId === "rs_memoryloss") nudge = 5;
        else if (nodeId === "rs_reduction") nudge = -15;
        else if (nodeId === "rs_selfconstruct") nudge = 15;
        else if (nodeId === "rs_presence") nudge = 25;
        else if (nodeId === "rs_rebirth") nudge = 30; // Push right to avoid Metzinger
        else if (nodeId === "rs_subtlebody") nudge = -10;
        else if (nodeId === "rs_astral") nudge = 10;
        else if (nodeId === "rs_ndes") nudge = 20;
        else if (nodeId === "rs_enlightenment") nudge = 25;

        // Subnodes are fanned out wider (multiplier 1.45)
        return familyRootX + offsetX * 1.45 + nudge;
      }
    }
    
    const factor = 1.25;
    return 600 + (x - 500) * factor;
  };

  const getY = (y: number, nodeId?: string) => {
    if (!nodeId) return 580 + (y - 490) * 0.94;
    const node = TREE_NODES.find((n) => n.id === nodeId);
    
    const familyRootId = getRootFamilyId(nodeId);
    if (familyRootId) {
      const familyRoot = TREE_NODES.find((n) => n.id === familyRootId);
      if (familyRoot) {
        // Natural original vertical depth mapping factor 1.15 (below soil line)
        const familyRootY = 580 + (familyRoot.y2d - 490) * 1.15;
        const offsetY = y - familyRoot.y2d;
        
        let nudge = 0;
        if (nodeId === "l_shankaracharya") nudge = -15;
        else if (nodeId === "l_vivekananda") nudge = 20;
        else if (nodeId === "l_sarvapriyananda") nudge = 25;
        else if (nodeId === "l_buddha") nudge = 30;
        else if (nodeId === "l_nagarjuna") nudge = 20;
        else if (nodeId === "l_ramana") nudge = -10;
        else if (nodeId === "l_nisargadatta") nudge = 25;
        else if (nodeId === "l_spira") nudge = 30;
        else if (nodeId === "l_lucille") nudge = -15;
        else if (nodeId === "l_metzinger") nudge = -15;
        else if (nodeId === "l_patanjali") nudge = -15;
        else if (nodeId === "l_ramakrishna") nudge = -15; // Raised slightly to avoid dropping too low
        
        // Sub-roots
        else if (nodeId === "rs_dvaita") nudge = -5;
        else if (nodeId === "rs_sankhya") nudge = 10;
        else if (nodeId === "rs_upanishads") nudge = 15;
        else if (nodeId === "rs_gitas") nudge = -25; // Raised vertically
        else if (nodeId === "rs_sunyata") nudge = 20;
        else if (nodeId === "rs_rigpa") nudge = -10;
        else if (nodeId === "rs_selfinquiry") nudge = -5;
        else if (nodeId === "rs_netineti") nudge = 15;
        else if (nodeId === "rs_witness") nudge = 15;
        else if (nodeId === "rs_whoami") nudge = -5;
        else if (nodeId === "rs_deepsleep") nudge = -60; // Raised closer to Shivom's Inquiry
        else if (nodeId === "rs_sensory") nudge = -5;
        else if (nodeId === "rs_womb") nudge = -5;
        else if (nodeId === "rs_memoryloss") nudge = -40; // Raised closer to Shivom's Inquiry
        else if (nodeId === "rs_reduction") nudge = 10;
        else if (nodeId === "rs_selfconstruct") nudge = -5;
        else if (nodeId === "rs_presence") nudge = 10;
        else if (nodeId === "rs_rebirth") nudge = -10;
        else if (nodeId === "rs_subtlebody") nudge = 15;
        else if (nodeId === "rs_astral") nudge = 15;
        else if (nodeId === "rs_ndes") nudge = -5;
        else if (nodeId === "rs_enlightenment") nudge = -10;

        // Subnodes are fanned vertically with multiplier 1.0 to prevent dropping too deep/low
        return familyRootY + offsetY * 1.0 + nudge;
      }
    }
    
    const factor = 0.94;
    return 580 + (y - 490) * factor;
  };

  // Mouse tracking for tooltip positioning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left + 15;
      let y = e.clientY - rect.top + 15;
      const tooltipW = 280;
      const tooltipH = 160;
      if (x + tooltipW > rect.width) {
        x = e.clientX - rect.left - tooltipW - 15;
      }
      if (y + tooltipH > rect.height) {
        y = e.clientY - rect.top - tooltipH - 15;
      }
      x = Math.max(10, Math.min(rect.width - tooltipW - 10, x));
      y = Math.max(10, Math.min(rect.height - tooltipH - 10, y));
      setTooltipPos({ x, y });
    }
  };

  // Helper to determine if a node path is highlighted (active hover flow)
  const isPathHighlighted = (node: TreeNode) => {
    if (!hoveredNode) return false;
    if (hoveredNode.id === node.id) return true;
    
    let current: TreeNode | undefined = hoveredNode;
    while (current && current.parentId) {
      if (current.parentId === node.id) return true;
      current = TREE_NODES.find((n) => n.id === current?.parentId);
    }
    return false;
  };

  // Quadratic Bezier curve builder for branches & roots
  const getCurvePath = (parent: TreeNode, node: TreeNode, isRoot: boolean) => {
    let sourceX = parent.x2d;
    let sourceY = parent.y2d;

    // Branches starting from the trunk connect to its top (420) instead of its center (490)
    if (parent.id === "trunk" && !isRoot) {
      sourceY = 420;
    }

    const sx = getX(sourceX, parent.id);
    const sy = getY(sourceY, parent.id);
    const ex = getX(node.x2d, node.id);
    const ey = getY(node.y2d, node.id);
    const dx = ex - sx;
    const dy = ey - sy;
    
    let cx = sx + dx * 0.5;
    let cy = sy + dy * 0.5;

    if (isRoot) {
      // Roots sweep wide and bend outwards
      cx = sx + dx * 0.25;
      cy = sy + dy * 0.75;
    } else {
      // Branches droop down under gravity then rise up into the canopy
      cx = sx + dx * 0.85;
      cy = sy + Math.max(0, dy) + Math.abs(dx) * 0.12;
    }
    return `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;
  };

  // Build a wavy aerial root path string
  const getAerialRootPath = (sx: number, sy: number, ex: number, ey: number) => {
    const startX = getX(sx);
    const startY = getY(sy);
    const endX = getX(ex);
    const endY = getY(ey);
    const midY = (startY + endY) / 2;
    
    // Wave control points for organic sagging roots
    const ctrlX1 = startX + (endX - startX) * 0.3 + 15;
    const ctrlX2 = startX + (endX - startX) * 0.7 - 10;
    return `M ${startX} ${startY} C ${ctrlX1} ${startY + 40}, ${ctrlX2} ${midY}, ${endX} ${endY}`;
  };

  // Click handler
  const handleNodeClick = (node: TreeNode) => {
    router.push(node.path);
  };

  // Static aerial root data representing banyan roots hanging from branches to the ground
  const aerialRoots = [
    { sx: 340, sy: 330, ex: 360, ey: 580 },
    { sx: 380, sy: 320, ex: 410, ey: 585 },
    { sx: 420, sy: 300, ex: 440, ey: 590 },
    { sx: 450, sy: 290, ex: 475, ey: 580 },
    { sx: 550, sy: 290, ex: 525, ey: 580 },
    { sx: 580, sy: 300, ex: 560, ey: 590 },
    { sx: 620, sy: 320, ex: 590, ey: 585 },
    { sx: 660, sy: 330, ex: 640, ey: 580 },
    { sx: 290, sy: 350, ex: 310, ey: 580 },
    { sx: 710, sy: 350, ex: 690, ey: 580 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full flex items-center justify-center select-none overflow-hidden z-10 p-2 relative"
    >
      <svg
        viewBox="0 0 1200 1000"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full drop-shadow-[0_0_20px_rgba(5,6,11,0.6)]"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.08)" />
            <stop offset="100%" stopColor="rgba(5, 6, 11, 0)" />
          </radialGradient>

          <radialGradient id="canopyBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#05060b" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4a3e26" />
            <stop offset="40%" stopColor="#8c7347" />
            <stop offset="70%" stopColor="#c5a663" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>

          <linearGradient id="rootGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#a88a54" />
            <stop offset="100%" stopColor="#574426" />
          </linearGradient>

          <linearGradient id="branchGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>

          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff5cc" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>

          <linearGradient id="fruitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffb300" />
            <stop offset="100%" stopColor="#d84315" />
          </linearGradient>

          <linearGradient id="crownGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="intenseGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glows */}
        <circle cx="600" cy="500" r="450" fill="url(#bgGlow)" />

        {/* Sprawling Canopy Silhouettes in background */}
        <g className="pointer-events-none">
          <circle cx={getX(500)} cy={getY(190)} r="240" fill="url(#canopyBg)" />
          <circle cx={getX(340)} cy={getY(220)} r="190" fill="url(#canopyBg)" />
          <circle cx={getX(660)} cy={getY(220)} r="190" fill="url(#canopyBg)" />
          <circle cx={getX(210)} cy={getY(270)} r="145" fill="url(#canopyBg)" />
          <circle cx={getX(790)} cy={getY(270)} r="145" fill="url(#canopyBg)" />
        </g>

        {/* Constellation backdrops */}
        <circle cx={getX(500)} cy={getY(490)} r="440" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="3 11" opacity="0.1" />
        <circle cx={getX(500)} cy={getY(490)} r="300" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.08" />

        {/* Ground soil line */}
        <path d={`M ${getX(40)} ${getY(580)} Q ${getX(500)} ${getY(595)}, ${getX(960)} ${getY(580)}`} fill="none" stroke="#d4af37" strokeWidth="2.5" opacity="0.25" />

        {/* Banyan Aerial Roots hanging down from branches to ground */}
        <g className="pointer-events-none">
          {aerialRoots.map((root, idx) => (
            <path
              key={`aerial-${idx}`}
              d={getAerialRootPath(root.sx, root.sy, root.ex, root.ey)}
              fill="none"
              stroke="url(#rootGradient)"
              strokeWidth="2.2"
              opacity="0.32"
              strokeDasharray={idx % 2 === 0 ? "none" : "4 2"}
            />
          ))}
        </g>

        {/* 1. THE TRUNK (Gnarled, Flared Banyan Trunk) */}
        <g className="cursor-pointer">
          {/* Main gnarled trunk body that flares out at base and branch split */}
          <path
            d={`M ${getX(452)} ${getY(580)} 
                C ${getX(445)} ${getY(540)}, ${getX(472)} ${getY(490)}, ${getX(475)} ${getY(420)} 
                L ${getX(525)} ${getY(420)} 
                C ${getX(528)} ${getY(490)}, ${getX(555)} ${getY(540)}, ${getX(548)} ${getY(580)} 
                Z`}
            fill="url(#trunkGradient)"
            opacity="0.95"
            className="transition-all duration-300"
            filter={hoveredNode?.id === "trunk" ? "url(#goldGlow)" : ""}
            onClick={() => handleNodeClick(TREE_NODES[0])}
            onMouseEnter={() => setHoveredNode(TREE_NODES[0])}
            onMouseLeave={() => setHoveredNode(null)}
          />
          {/* Detailed vertical wood strand overlays to create texture */}
          <path d={`M ${getX(465)} ${getY(580)} C ${getX(458)} ${getY(515)}, ${getX(485)} ${getY(465)}, ${getX(490)} ${getY(420)}`} fill="none" stroke="#2b2010" strokeWidth="3" opacity="0.55" className="pointer-events-none" />
          <path d={`M ${getX(535)} ${getY(580)} C ${getX(542)} ${getY(515)}, ${getX(515)} ${getY(465)}, ${getX(510)} ${getY(420)}`} fill="none" stroke="#2b2010" strokeWidth="3" opacity="0.55" className="pointer-events-none" />
          <path d={`M ${getX(500)} ${getY(580)} C ${getX(492)} ${getY(510)}, ${getX(508)} ${getY(450)}, ${getX(501)} ${getY(420)}`} fill="none" stroke="#2b2010" strokeWidth="4" opacity="0.65" className="pointer-events-none" />
          
          {/* Flared base roots overlapping and wrapping around soil */}
          <path d={`M ${getX(440)} ${getY(580)} Q ${getX(475)} ${getY(555)} ${getX(500)} ${getY(580)}`} fill="none" stroke="url(#rootGradient)" strokeWidth="9" opacity="0.9" className="pointer-events-none" />
          <path d={`M ${getX(560)} ${getY(580)} Q ${getX(525)} ${getY(555)} ${getX(500)} ${getY(580)}`} fill="none" stroke="url(#rootGradient)" strokeWidth="9" opacity="0.9" className="pointer-events-none" />
        </g>

        {/* 2. ROOT & BRANCH PATH LINES */}
        <g>
          {TREE_NODES.map((node) => {
            if (!node.parentId) return null;

            const parent = TREE_NODES.find((n) => n.id === node.parentId);
            if (!parent) return null;

            const isRoot = node.category === "roots" || getRootFamilyId(node.id) !== null;
            const highlighted = isPathHighlighted(node);

            let strokeWidth = 3;
            if (node.id.startsWith("r_") || node.id.startsWith("b_")) {
              strokeWidth = 7.5;
            } else if (node.category === "leaves" || node.category === "fruit") {
              strokeWidth = 2.2;
            }

            const pathColor = isRoot ? "url(#rootGradient)" : "url(#branchGradient)";

            return (
              <path
                key={`line-${node.id}`}
                d={getCurvePath(parent, node, isRoot)}
                fill="none"
                stroke={highlighted ? "#ffd700" : pathColor}
                strokeWidth={highlighted ? strokeWidth + 2.5 : strokeWidth}
                strokeLinecap="round"
                opacity={highlighted ? 0.95 : 0.5}
                className="transition-all duration-300 pointer-events-none"
                filter={highlighted ? "url(#goldGlow)" : ""}
              />
            );
          })}
        </g>

        {/* 3. INTERACTIVE NODE ELEMENTS (Leaves, Fruits, Joint points) */}
        <g>
          {TREE_NODES.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            const highlighted = isPathHighlighted(node);

            // 3a. FRUITS (Hanging practices)
            if (node.category === "fruit") {
              const isMoksha = node.id === "f_moksha";

              if (isMoksha) {
                // Crown Apex Element (Moksha)
                return (
                  <g key={node.id}>
                    {/* Translate group */}
                    <g transform={`translate(${getX(node.x2d, node.id)}, ${getY(node.y2d, node.id)})`}>
                      {/* Scale group with transition and static transformOrigin */}
                      <g
                        transform={`scale(${isHovered ? 1.25 : 1})`}
                        className="transition-transform duration-300 pointer-events-none"
                        style={{ transformOrigin: "0px 0px" }}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={24}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          opacity={isHovered ? 0.9 : 0.4}
                          className="animate-[spin_20s_linear_infinite]"
                          style={{ transformOrigin: "center" }}
                        />
                        <path
                          d="M 0 -20 C 18 -20, 24 6, 0 28 C -24 6, -18 -20, 0 -20 Z"
                          fill="url(#crownGradient)"
                          stroke="#ffffff"
                          strokeWidth={isHovered ? 2.5 : 1}
                          filter={isHovered ? "url(#intenseGlow)" : "url(#goldGlow)"}
                        />
                        <circle cx="0" cy="5" r="5" fill="#ffffff" className="animate-pulse" />
                      </g>
                    </g>

                    {/* ROCK-SOLID STATIC HIT ZONE */}
                    <circle
                      cx={getX(node.x2d, node.id)}
                      cy={getY(node.y2d, node.id)}
                      r={32}
                      fill="transparent"
                      className="cursor-pointer"
                      onClick={() => handleNodeClick(node)}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      tabIndex={0}
                      aria-label={`Crown Node: ${node.name}. ${node.question}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleNodeClick(node);
                      }}
                    />
                  </g>
                );
              }

              // Standard Hanging Fruits
              return (
                <g key={node.id}>
                  {/* Translate group */}
                  <g transform={`translate(${getX(node.x2d, node.id)}, ${getY(node.y2d, node.id)})`}>
                    {/* Scale group with transition and static transformOrigin */}
                    <g
                      transform={`scale(${isHovered ? 1.3 : 1})`}
                      className="transition-transform duration-300 pointer-events-none"
                      style={{ transformOrigin: "0px 0px" }}
                    >
                      <path d="M 0 -14 Q -3 -7, 0 0" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.75" />
                      <path
                        d="M 0 0 C 8 0, 11 8, 0 18 C -11 8, -8 0, 0 0 Z"
                        fill="url(#fruitGradient)"
                        stroke="#ff9800"
                        strokeWidth={isHovered ? 2 : 1}
                        filter={isHovered ? "url(#goldGlow)" : ""}
                      />
                      <circle cx="0" cy="6" r="3.5" fill="#ffffff" opacity={isHovered ? 0.95 : 0.65} className="animate-pulse" />
                    </g>
                  </g>

                  {/* STATIC HIT ZONE */}
                  <circle
                    cx={getX(node.x2d, node.id)}
                    cy={getY(node.y2d, node.id)}
                    r={26}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    tabIndex={0}
                    aria-label={`Fruit Node: ${node.name}. ${node.question}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleNodeClick(node);
                    }}
                  />
                </g>
              );
            }

            // 3b. THINKERS (Golden Leaves)
            if (node.category === "leaves") {
              let angle = Math.atan2(getY(node.y2d, node.id) - getY(530), getX(node.x2d, node.id) - getX(600)) * (180 / Math.PI);
              if (node.id === "l_metzinger") angle -= 40;

              return (
                <g key={node.id}>
                  {/* Translate group */}
                  <g transform={`translate(${getX(node.x2d, node.id)}, ${getY(node.y2d, node.id)})`}>
                    {/* Rotate & Scale group with transition and static transformOrigin */}
                    <g
                      transform={`rotate(${angle}) scale(${isHovered ? 1.35 : 1})`}
                      className="transition-transform duration-300 pointer-events-none"
                      style={{ transformOrigin: "0px 0px" }}
                    >
                      <path
                        d="M 0 0 C 14 -12, 30 -8, 34 0 C 30 8, 14 12, 0 0 Z"
                        fill={isHovered ? "#ffffff" : "url(#leafGradient)"}
                        stroke="#ffd700"
                        strokeWidth={isHovered ? 2 : 1}
                        filter={isHovered ? "url(#goldGlow)" : ""}
                      />
                      <line x1="0" y1="0" x2="34" y2="0" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
                    </g>
                  </g>

                  {/* STATIC HIT ZONE */}
                  <circle
                    cx={getX(node.x2d, node.id)}
                    cy={getY(node.y2d, node.id)}
                    r={22}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    tabIndex={0}
                    aria-label={`Thinker Leaf: ${node.name}. ${node.question}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleNodeClick(node);
                    }}
                  />
                </g>
              );
            }

            // 3c. STRUCTURAL JOINTS (Roots, Branches, Subroots, Sub-branches)
            if (node.id !== "trunk") {
              const isSubNode = node.id.startsWith("rs_") || node.id.startsWith("bs_");
              const size = isSubNode ? 5 : 8.5;

              return (
                <g key={node.id}>
                  {/* Translate group */}
                  <g transform={`translate(${getX(node.x2d, node.id)}, ${getY(node.y2d, node.id)})`}>
                    {/* Scale group with transition and static transformOrigin */}
                    <g
                      transform={`scale(${isHovered ? 1.3 : 1})`}
                      className="transition-transform duration-300 pointer-events-none"
                      style={{ transformOrigin: "0px 0px" }}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={size + 5.5}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1.5"
                        opacity={isHovered ? 0.95 : highlighted ? 0.65 : 0}
                        className="animate-ping origin-center"
                      />
                      <circle
                        cx="0"
                        cy="0"
                        r={size}
                        fill={isHovered ? "#ffffff" : node.color}
                        stroke="#ffffff"
                        strokeWidth={isHovered ? 1.5 : 0.5}
                        filter={isHovered ? "url(#goldGlow)" : highlighted ? "url(#goldGlow)" : ""}
                      />
                    </g>
                  </g>

                  {/* STATIC HIT ZONE */}
                  <circle
                    cx={getX(node.x2d, node.id)}
                    cy={getY(node.y2d, node.id)}
                    r={20}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    tabIndex={0}
                    aria-label={`${node.category.toUpperCase()} Node: ${node.name}. ${node.question}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleNodeClick(node);
                    }}
                  />
                </g>
              );
            }

            return null;
          })}
        </g>
      </svg>

      {/* 4. TOOLTIP OVERLAY */}
      {hoveredNode && (
        <div
          className={`absolute pointer-events-none rounded-2xl p-4 max-w-xs transition-opacity duration-200 z-50 border shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${
            isDark
              ? "glass-panel border-gold-matte/30"
              : "bg-white/92 backdrop-blur-md border-amber-300/60"
          }`}
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: "translate(5px, 5px)",
          }}
        >
          <div className={`text-[9px] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1 ${isDark ? "text-gold-matte/80" : "text-amber-600/80"}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? "bg-gold-bright" : "bg-amber-500"}`} />
            {hoveredNode.category}
          </div>
          <div className={`font-serif text-base mb-1.5 ${isDark ? "text-gold-bright" : "text-amber-700"}`}>
            {hoveredNode.name}
          </div>
          <p className={`text-[11px] leading-relaxed italic border-t pt-1.5 ${isDark ? "text-gold-light/95 border-gold-matte/10" : "text-amber-800/85 border-amber-300/30"}`}>
            &ldquo;{hoveredNode.question}&rdquo;
          </p>
          <div className={`mt-2.5 text-[8.5px] font-semibold tracking-wider uppercase flex items-center gap-1 ${isDark ? "text-gold-matte/60" : "text-amber-500/70"}`}>
            <Sparkles className={`w-3 h-3 animate-pulse ${isDark ? "text-gold-bright" : "text-amber-500"}`} />
            Click to traverse node
          </div>
        </div>
      )}
    </div>
  );
}
