import React from "react";

type SwitchProps = {
  test: string;
  children: React.ReactNode[];
};

function Switch(props: SwitchProps) {
  if (!props.children) return null;

  return props.children.find((child) => {
    if (!React.isValidElement(child)) return false;
    return child.props["data-value"] === props.test;
  });
}

export default Switch;
