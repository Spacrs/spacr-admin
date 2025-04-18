export enum Textvarient {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  PARAGRAPH = "p",
  Link = "a",
}
export interface Element {
  id: number;
  x: number;
  y: number;
  width: number | string;
  height: number | string;
  content: string;
  textVarient?: string;
  imageVarient?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: string;
  padding?: number;
  borderEnabled?: boolean;
  strockColor?: string;
  borderStroke?: string;
  boxShadow?: string;
  imagePreview?: string;
  borderColor?: string;
  borderWidth?: number;
  strockHeight?: number | string;
  name?: string;
  value?: string;
  imageUrl?: string;
  opacity?: number;
  filter?: string;
  overlay?: boolean;
  blur?: number;
  sectionType?: string;
  key?: string;
  data?: any;
}

export interface Iconfigration {
  zoomLevel: number;
  isPortrait: boolean;
  globalColorStyle: string;
};

export interface IRNDElement {
  handleDrag?: (x: number, y: number) => void;
  handleDragStop?: (id: number, x: number, y: number) => void;
  handleResizeStop?: (id: number, x: number, y: number) => void;
  guideLines?: React.ComponentState;
  roleName: string | null | "admin" | "utilizer";
  addSection?: (el: { name: string; value: string }) => void;
}
