type Result <T> = {
  success: boolean,
  result: T
}

export type Primitive = null|number|string|object|boolean;

export enum ServiceEvents {
  Update
}

export interface IEvent<T extends ServiceEvents = ServiceEvents, U = void> {
  name: T,
  data?: U
}

export interface IServiceState {
  ready: boolean;
  error: boolean;
}
