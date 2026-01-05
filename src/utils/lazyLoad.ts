import { lazy, ComponentType } from "react";

export function lazyLoad<T extends ComponentType<any>>(
  factory: () => Promise<{ [key: string]: T }>,
  exportName: string = "default"
) {
  return lazy(() =>
    factory().then((module) => ({
      default: module[exportName] as T,
    }))
  );
}
