import { ChangeEventHandler, useCallback, useState } from 'react';

import { isPartWithOptions } from '../../../core/part';

import { useAppContext } from '../../App/AppContextProvider';
import Modal from '../../Modal/Modal';

import PartOptions from './PartOptions';

import options from './options.svg';
import rotate from './rotate.svg';

interface PartRowProps {
  part: Part;
}

function PartRow({ part }: PartRowProps) {
  const { actions } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const hasRotation = typeof part.rotation !== 'undefined';

  const onUpdateName: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    actions.updatePart(part.id, { name: e.target.value });
  }, [actions, part.id]);

  const onUpdateOffsetX: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    actions.updatePart(part.id, { offsetX: parseFloat(e.target.value) });
  }, [actions, part.id]);

  const onUpdateOffsetY: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    actions.updatePart(part.id, { offsetY: parseFloat(e.target.value) });
  }, [actions, part.id]);

  const onRemovePart = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to remove "${part.name}"`)) {
      actions.removePart(part.id);
      closeModal();
    }
  }, [actions, closeModal, part.id, part.name]);

  const onRotate = useCallback(() => {
    if (typeof part.rotation !== 'undefined') {
      actions.updatePart(part.id, { rotation: (part.rotation + 90) % 360 })
    }
  }, [actions, part.id, part.rotation]);

  return (
    <div className="PartRow">
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="PartRow_Modal">
          <div className="PartRow_Position">
            <label>Position:</label>
            <fieldset>
              <section>
                <label>x:</label>
                <input type="number" value={part.offsetX?.toString().match(/\d+\.\d{3,}/) ? part.offsetX?.toFixed(2) : part.offsetX} onChange={onUpdateOffsetX} />
              </section>
              <section>
                <label>y:</label>
                <input type="number" value={part.offsetY?.toString().match(/\d+\.\d{3,}/) ? part.offsetY?.toFixed(2) : part.offsetY} onChange={onUpdateOffsetY} />
              </section>
            </fieldset>
          </div>
          {isPartWithOptions(part) && <PartOptions part={part} />}
          <div className="PartRow_Actions">
            <button
              type="button"
              className="main"
              onClick={onRemovePart}
            >
              Remove Part
            </button>
            <button onClick={closeModal}>
              Done
            </button>
          </div>
        </div>
      </Modal>
      <div className="PartRow_Name">
        <input type="text" value={part.name} onChange={onUpdateName} />
        {hasRotation && (
          <button type="button" className="options" onClick={onRotate}>
            <img src={rotate} alt="Rotate 90 degrees" />
          </button>
        )}
        <button type="button" className="options" onClick={openModal}>
          <img src={options} alt="Options" />
        </button>
      </div>
    </div>
  );
}

export default PartRow;
