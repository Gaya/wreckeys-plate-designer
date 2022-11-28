import { ChangeEventHandler, useCallback } from 'react';

import { useAppContext } from '../../App/AppContextProvider';

interface PartRowProps {
  part: Part;
}

function PartRow({ part }: PartRowProps) {
  const { actions } = useAppContext();

  const onUpdateName: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    actions.updatePart(part.id, { name: e.target.value });
  }, [actions, part.id]);

  const onUpdateOffsetX: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    actions.updatePart(part.id, { offsetX: parseFloat(e.target.value) });
  }, [actions, part.id]);

  const onUpdateOffsetY: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    actions.updatePart(part.id, { offsetY: parseFloat(e.target.value) });
  }, [actions, part.id]);

  return (
    <div className="PartRow">
      <div className="PartRow_Name">
        <input type="text" value={part.name} onChange={onUpdateName} />
        <button type="button">×</button>
      </div>
      <div className="PartRow_Position">
        <section>
          <label>x:</label>
          <input type="number" value={part.offsetX?.toFixed(2)} onChange={onUpdateOffsetX} />
        </section>
        <section>
          <label>y:</label>
          <input type="number" value={part.offsetY?.toFixed(2)} onChange={onUpdateOffsetY} />
        </section>
      </div>
    </div>
  );
}

export default PartRow;
