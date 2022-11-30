import React from "react";
import { useLocation } from "react-router-dom";
import Create from "./Create";
import Update from "./Update";
import View from "./View";

const GridBase = () => {
  const search = useLocation().search;
  const slug_name = new URLSearchParams(search).get("slug_name");
  const slug_type = new URLSearchParams(search).get("slug_type");
  const id = new URLSearchParams(search).get("id");

  switch (slug_type) {
    case "grid":
      return <View slug_name={slug_name} slug_type={slug_type} />;

    case "create":
      return <Create slug_name={slug_name} slug_type={slug_type} />;

    case "update":
      return <Update slug_name={slug_name} slug_type={slug_type} id={id} />;

    default:
      return <View slug_name={slug_name} slug_type={slug_type} />;
  }
};

export default GridBase;
