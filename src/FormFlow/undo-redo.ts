// Ref.
// https://allenhwkim.medium.com/simplest-undo-redo-from-the-scratch-264063d24554

import { ReactFlowInstance } from '@xyflow/react';

// https://codesandbox.io/p/sandbox/y4xwsj
export function addUndoRedo(
  rfInstance: ReactFlowInstance | undefined,
  changes?: any[],
  types?: any
) {
  const undoable = changes ?
    !!rfInstance && types && types.includes(changes[0].type) :
    !!rfInstance;

  if (rfInstance && undoable) {
    const nodes = rfInstance.getNodes();
    const edges = rfInstance.getEdges();
    UndoRedo.add({nodes, edges});
  }
}

const UndoRedo = {
  states: [] as any[], // undo/redo items
  stateNdx: 0, // current undo/redo position
  undoRedoed: false,

  reset(state:any) {
    this.states = [...[state]];
    this.stateNdx++;
  },

  setIndex(inc: number) {
    const [min, max] = [0, this.states.length-1];
    this.stateNdx = this.stateNdx + inc;
    if (this.stateNdx < min) {
      this.stateNdx = min;
    } else if (this.stateNdx > max) {
      this.stateNdx = max;
    } else {
      return true;
    }
  },

  undo() {
    if (this.setIndex(-1)) {
      const state = this.states[this.stateNdx];
      // console.log('undo-redo undo', this.states, this.stateNdx);
      this.undoRedoed = true;
      setTimeout(() => this.undoRedoed = false, 300);
      return state;
    };
  },

  redo(){
    if (this.setIndex(+1)) {
      const state = this.states[this.stateNdx];
      // console.log('undo-redo redo', this.states, this.stateNdx);
      this.undoRedoed = true;
      setTimeout(() => this.undoRedoed = false, 300);
      return state;
    }
  },

  debounceMs: 300,
  timeout: 0,
  add(state:any){
    clearTimeout(this.timeout);
    if (this.undoRedoed) return;
    this.timeout = setTimeout(() => {
      this.states = [...this.states.slice(0, this.stateNdx+1), state];
      this.setIndex(+1);
      // console.log('undo-redo add', this.states, this.stateNdx);
    }, this.debounceMs) as any;
  }
}

export default UndoRedo;
