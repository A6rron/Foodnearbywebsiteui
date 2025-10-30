// Minimal global typings to avoid TypeScript errors when @types/react is not installed
// This is a pragmatic shim for the development environment. For full type safety,
// install `@types/react` and remove this file.

declare module 'react'
declare module 'react/jsx-runtime'

declare namespace JSX {
  // Allow any intrinsic element to avoid `JSX.IntrinsicElements` errors in this project
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
