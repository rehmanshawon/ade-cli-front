import React from "react";
import { useLocation } from "react-router-dom";
import Create from "./Create";
import View from "./View";

const GridBase = () => {
  const search = useLocation().search;
  const slug_name = new URLSearchParams(search).get("slug_name");
  const slug_type = new URLSearchParams(search).get("slug_type");

  switch (slug_type) {
    case "grid":
      return <View slug_name={slug_name} />;

    case "form":
      return <Create slug_name={slug_name} />;

    default:
      return <View slug_name={slug_name} />;
  }
};

export default GridBase;
