import React from "react";

const PageLayout = (props) => {
  const getClassName = () => {
    return "page-container " + props.class;
  };

  return <div className={getClassName()}>{props.children}</div>;
};

export default PageLayout;
