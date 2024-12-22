/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}