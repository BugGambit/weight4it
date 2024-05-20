import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>weight4it</h1>
      {children}
    </>
  );
}
