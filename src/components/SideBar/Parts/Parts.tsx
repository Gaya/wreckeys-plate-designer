import { useCallback, useState } from 'react';

import { knobPart } from '../../../parts/knob';
import { plateToPart } from '../../../parts/plate';

import { useAppContext } from '../../App/AppContextProvider';
import Modal from '../../Modal/Modal';

import knob from './knob.svg';
import slider from './slider.svg';
import segment from './segment.svg';
import hole from './hole.svg';

import './Parts.scss';
import PartRow from './PartRow';
import { holePart } from '../../../parts/hole';

function Parts() {
  const { state, actions } = useAppContext();

  const { parts, plate } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const openModal = useCallback(() => setIsModalOpen(true), []);

  const platePart = plateToPart(plate);

  const onAddPart = useCallback((type: PartType) => {
    const cx = platePart.width / 2;
    const cy = platePart.height / 2;

    let part: Part | null = null;

    switch (type) {
      case 'knob':
        part = knobPart();
        break;

      case 'hole':
        part = holePart();
        break;
    }

    if (part) {
      part.offsetX = cx - part.width / 2;
      part.offsetY = cy - part.height / 2;

      actions.addPart(part);
    }

    closeModal();
  }, [actions, closeModal, platePart.height, platePart.width]);

  return (
    <>
      <Modal open={isModalOpen} onClose={closeModal}>
        {isModalOpen && (
          <section className="parts-options">
            <ul>
              <li>
                <button type="button" onClick={() => onAddPart('knob')}>
                  <img src={knob} alt="Knob" />
                  Knob
                </button>
              </li>
              <li>
                <button type="button">
                  <img src={slider} alt="Slider" />
                  Slider
                </button>
              </li>
              <li>
                <button>
                  <img src={segment} alt="Segment" />
                  Segment Display
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onAddPart('hole')}>
                  <img src={hole} alt="Hole" />
                  Hole
                </button>
              </li>
            </ul>
          </section>
        )}
      </Modal>
      <h2>Parts</h2>
      <fieldset>
        <button type="button" onClick={openModal}>
          + Add Part
        </button>
      </fieldset>
      {parts.map((part) => (
        <PartRow key={part.id} part={part} />
      ))}
    </>
  );
}

export default Parts;
