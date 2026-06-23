export interface SubSection {
  title: string;
  desc: string;
}

export interface Reading {
  title: string;
  author: string;
}

export interface Bridge {
  name: string;
  path: string;
  desc: string;
}

export interface NodeData {
  title: string;
  code: string;
  question: string;
  scope: string;
  subsections?: SubSection[];
  thinkers: string[];
  readings: Reading[];
  bridge: Bridge;
  childLinks?: {
    title: string;
    path: string;
    desc: string;
    image?: string;
  }[];
  warning?: string;
  steps?: {
    title: string;
    desc: string;
    image?: string;
  }[];
}

export interface ThinkerData {
  name: string;
  era: string;
  question: string;
  contribution: string;
  quote: string;
  works: string[];
  spectrum: string;
  connections: string[];
  // Extended fields (optional — available for enriched profiles)
  keyIdeas?: string[];
  legacy?: string;
  approach?: string;
  color?: string;
  spectrumPercent?: number;
  additionalQuotes?: string[];
}

import { ROOTS_DATA } from "./data/rootsData";
import { BRANCHES_DATA } from "./data/branchesData";
import { FRUITS_DATA } from "./data/fruitsData";
import { THINKERS_DATA } from "./data/thinkersData";

export { ROOTS_DATA, BRANCHES_DATA, FRUITS_DATA, THINKERS_DATA };
