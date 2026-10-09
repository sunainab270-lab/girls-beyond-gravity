import type { HTMLAttributes } from "react";
import "react";
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      math: HTMLAttributes<Element>;
      mover: HTMLAttributes<Element>;
      mi: HTMLAttributes<Element>;
      mo: HTMLAttributes<Element>;
    }
  }
}
