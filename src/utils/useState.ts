export enum States {
  "dryRun",
  "debugMode",
}

type StateObject = Record<States, boolean>;

class stateMachine {
  private state;

  constructor(state: StateObject) {
    this.state = state;
  }

  get(): StateObject {
    return this.state;
  }

  set(state: StateObject) {
    this.state = state;
  }
}

const initialState: StateObject = {
  [States.dryRun]: false,
  [States.debugMode]: false,
};

const state = new stateMachine(initialState);

type StateItem = [() => unknown, (newValue: unknown) => void];

const useState = (stateKey: States): StateItem => {
  const getter = () => state.get()[stateKey];

  const setter = (newValue: unknown) => {
    const currentState = state.get();
    state.set({ ...currentState, [stateKey]: newValue });
  };

  return [getter, setter];
};

export default useState;
