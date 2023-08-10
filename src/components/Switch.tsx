type SwitchProps = {
  test: string;
  children: React.ReactNode;
};

function Switch(props: SwitchProps) {
  if (!props.children) return null;

  return props.children.find((child) => {
    return child.props.value === props.test;
  });
}

export default Switch;
