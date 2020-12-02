import React from "react";
import DataProvider from "./contexts/DataProvider";

export default function GrandChild() {
  const things = useContext(DataProvider);
  return <div></div>;
}
