import {EVENT} from "./enums";
import {IEventListener} from "./types";


export class PuzzleJs {
  [module: string]: any;

  static PACKAGE_VERSION = '';
  static DEPENDENCIES = {};
  static LOGO = '';

  private static __LISTENERS: IEventListener = {};

  static subscribe(event: EVENT, cb: Function) {
    if (!PuzzleJs.__LISTENERS[event]) {
      PuzzleJs.__LISTENERS[event] = [cb];
    } else {
      PuzzleJs.__LISTENERS[event].push(cb);
    }
  }

  static emit(event: EVENT, ...data: any[]) {
    if (PuzzleJs.__LISTENERS[event]) {
      for (const listener of PuzzleJs.__LISTENERS[event]) {
        listener.apply(null, data);
      }
    }
  }

  static clearListeners() {
    PuzzleJs.__LISTENERS = {};
  }

  static inject(modules: { [name: string]: Function }) {
    for (const name in modules) {
      (PuzzleJs as any)[name] = modules[name];
    }
  }
}
