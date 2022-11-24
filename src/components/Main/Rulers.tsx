import useEditorContext from './hooks/useEditorContext';
import Ruler from './Ruler';

function Rulers() {
  const { outerWidth, outerHeight } = useEditorContext();

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${outerWidth} ${outerHeight}`}>
      <rect
        fill="#222"
        x={0}
        y={0}
        width={30}
        height={30}
        stroke="#ccc"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <Ruler
        orientation="horizontal"
        length={1000}
        size={30}
        padding={10}
      />
      <Ruler
        orientation="vertical"
        length={1000}
        size={30}
        padding={10}
      />
    </svg>
  );
}

export default Rulers;
