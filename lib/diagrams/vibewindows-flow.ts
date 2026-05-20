import type { Edge, Node } from "@xyflow/react";

/** WUI pipeline nodes for the VibeWindows architecture diagram. */
export const vibewindowsNodes: Node[] = [
  { id: "camera", position: { x: 0, y: 20 }, data: { label: "Webcam" } },
  {
    id: "broker",
    position: { x: 0, y: 100 },
    data: { label: "CaptureBroker" },
  },
  {
    id: "session",
    position: { x: 0, y: 180 },
    data: { label: "VisionSession" },
  },
  {
    id: "engine",
    position: { x: 0, y: 260 },
    data: { label: "IVisionEngine" },
  },
  {
    id: "python",
    position: { x: -180, y: 260 },
    data: { label: "Python TCP :5757" },
  },
  {
    id: "onnx",
    position: { x: -180, y: 340 },
    data: { label: "ONNX Runtime" },
  },
  {
    id: "gesture",
    position: { x: 200, y: 260 },
    data: { label: "GesturePolicy" },
  },
  {
    id: "pointer",
    position: { x: 200, y: 340 },
    data: { label: "PointerDriver" },
  },
  {
    id: "safety",
    position: { x: 200, y: 420 },
    data: { label: "InjectionSafety" },
  },
  {
    id: "kinect",
    position: { x: 400, y: 100 },
    data: { label: "Kinect Preview UI" },
  },
  {
    id: "desktop",
    position: { x: 400, y: 340 },
    data: { label: "Virtual Desktop" },
  },
];

export const vibewindowsEdges: Edge[] = [
  { id: "e1", source: "camera", target: "broker" },
  { id: "e2", source: "broker", target: "session" },
  { id: "e3", source: "session", target: "engine" },
  { id: "e4", source: "engine", target: "gesture", label: "VisionResult" },
  { id: "e5", source: "gesture", target: "pointer" },
  { id: "e6", source: "pointer", target: "safety" },
  { id: "e7", source: "safety", target: "desktop" },
  { id: "e8", source: "python", target: "engine", label: "opcional" },
  { id: "e9", source: "onnx", target: "engine", label: "in-process" },
  { id: "e10", source: "broker", target: "kinect" },
];
