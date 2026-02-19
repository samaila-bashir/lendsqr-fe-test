import type { ReactNode } from 'react';
import { createElement } from 'react';

export type Wrapper = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- heterogeneous components (Provider, PersistGate, etc.) have incompatible prop shapes
  React.ComponentType<any>,
  Record<string, unknown>
];

export function nest(wrappers: Wrapper[], content: ReactNode): ReactNode {
  return wrappers.reduceRight<ReactNode>(
    (inner, [Comp, props]) =>
      createElement(Comp, { ...props, children: inner }),
    content
  );
}
