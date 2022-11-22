interface LineRendererProps {
  relative: LineRect;
  line: LineLine;
}

function LineRenderer({ line }: LineRendererProps) {
  return (
    <>line: {line.id}</>
  );
}

export default LineRenderer;
