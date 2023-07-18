/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*.svelte" {
  import type { ComponentType } from "svelte";
  const component: ComponentType;
  export default component;
}

import {IForm, ISubmit, IUserData, IForms} from '@formflow/elements/src/form-stepper/types';

export {IForm, ISubmit, IUserData, IForms};

export interface INode {
  width: number;
  height: number;
  id: string;
  type: string;
  data?: { label: string; },
  position: { x: number; y: number; },
  positionAbsolute: { x: number; y: number; }
  selected?: boolean;
  dragging?: boolean;
  deletable?: boolean;
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}