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

  return (
    <div className="PartRow">
      <div className="PartRow_Name">
        <input type="text" value={part.name} onChange={onUpdateName} />
        <button type="button">×</button>
      </div>
    </div>
  );
}

export default PartRow;
