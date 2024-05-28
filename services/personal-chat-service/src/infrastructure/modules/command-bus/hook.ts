import { toArray } from "../../utils/to-array";
import { AllowArray } from "../../utils/types";

export const COMMAND_BUS_VALID_HOOKS = [
  "beforeRegisterHandler",
  "afterRegisterHandler",
  "beforeExecute",
  "afterExecute",
] as const;

export type CommandBusHookName = (typeof COMMAND_BUS_VALID_HOOKS)[number];

export type CommandBusHookHandler = {
  name?: string; //hookHandler's name
  run: (...args: any[]) => Promise<void> | void;
};

export type CommandBusHookHandlerMap = Partial<
  Record<
    CommandBusHookName,
    AllowArray<CommandBusHookHandler | CommandBusHookHandler["run"]>
  >
>;

export class CommandBusHookManager {
  #handlerMap: Map<CommandBusHookName, CommandBusHookHandler[]> = new Map();

  removeAllHookHandlers() {
    this.#handlerMap.clear();
  }

  getHookHandlers(hookName: CommandBusHookName) {
    return this.#handlerMap.get(hookName) || [];
  }

  hasHookHandler(hookName: CommandBusHookName) {
    return Boolean(this.getHookHandlers(hookName)?.length);
  }

  #getNamedHookHandler(hookName: CommandBusHookName, listenerName: string) {
    const handlerMap = this.getHookHandlers(hookName);

    return (
      handlerMap.find((hookHandler) => hookHandler?.name === listenerName) ??
      null
    );
  }

  removeHookHandler(
    hookName: CommandBusHookName,
    hookHandler: string | CommandBusHookHandler
  ) {
    this.#handlerMap.set(
      hookName,
      this.getHookHandlers(hookName).filter((_hookHandler) => {
        if (typeof hookHandler === "string")
          return _hookHandler.name !== hookHandler;

        return _hookHandler !== hookHandler;
      })
    );
  }

  addHookHandler(
    hookName: CommandBusHookName,
    hookHandler: CommandBusHookHandler
  ) {
    const existingNamedHookHandler = hookHandler?.name
      ? this.#getNamedHookHandler(hookName, hookHandler.name)
      : null;

    if (existingNamedHookHandler)
      throw new Error(
        `Existing hook handler with same name ${hookHandler?.name} on hook ${hookName}`
      );

    const hookHandlers = this.getHookHandlers(hookName);

    this.#handlerMap.set(hookName, [...hookHandlers, hookHandler]);

    return () => {
      this.removeHookHandler(hookName, hookHandler);
    };
  }

  addHookHandlers(handlerMap: CommandBusHookHandlerMap) {
    for (let _hookName in handlerMap) {
      const hookName = _hookName as CommandBusHookName;

      const hookHandlers = toArray(
        handlerMap[hookName as CommandBusHookName] || []
      );

      hookHandlers.forEach((hookHandler) => {
        if (typeof hookHandler === "function")
          this.addHookHandler(hookName, { run: hookHandler });
        else this.addHookHandler(hookName, hookHandler);
      });
    }
  }

  runSync(hookName: CommandBusHookName, ...args: any[]) {
    const hookHandlers = this.getHookHandlers(hookName);

    for (const hookHandler of hookHandlers) {
      const out = hookHandler.run(...args);

      if (out instanceof Promise)
        throw new Error("Cannot run an async hook handler when run sync");
    }
  }

  async runAsync(hookName: CommandBusHookName, ...args: any[]) {
    const hookHandlers = this.getHookHandlers(hookName);

    for (const hookHandler of hookHandlers) {
      await hookHandler.run(...args);
    }
  }
}
