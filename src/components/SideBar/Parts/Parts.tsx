import { useCallback, useState } from 'react';

import { knobPart } from '../../../parts/knob';
import { plateToPart } from '../../../parts/plate';
import { circlePart } from '../../../parts/circle';
import { sliderPart } from '../../../parts/slider';
import { segmentPart } from '../../../parts/segment';
import { rectPart } from '../../../parts/rect';
import { guideLinePart } from '../../../parts/guideLine';

import { useAppContext } from '../../App/AppContextProvider';
import Modal from '../../Modal/Modal';

import knob from './knob.svg';
import slider from './slider.svg';
import segment from './segment.svg';
import circle from './circle.svg';
import rect from './rect.svg';
import guide from './guide.svg';

import './Parts.scss';
import PartRow from './PartRow';

function Parts() {
  const { state, actions } = useAppContext();

  const { parts, plate } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const openModal = useCallback(() => setIsModalOpen(true), []);

  const platePart = plateToPart(plate);

  const onAddPart = useCallback((type: PartType) => {
    const cx = platePart.width() / 2;
    const cy = platePart.height() / 2;

    let part: Part | null = null;

    switch (type) {
      case 'knob':
        part = knobPart();
        break;

      case 'circle':
        part = circlePart();
        break;

      case 'slider':
        part = sliderPart();
        break;

      case 'segment':
        part = segmentPart();
        break;

      case 'rect':
        part = rectPart();
        break;

      case 'guideline':
        part = guideLinePart();
        break;
    }

    if (part) {
      part.offsetX = cx - part.width() / 2;
      part.offsetY = cy - part.height() / 2;

      actions.addPart(part);
    }

    closeModal();
  }, [actions, closeModal, platePart]);

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
                <button type="button" onClick={() => onAddPart('slider')}>
                  <img src={slider} alt="Slider" />
                  Slider
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onAddPart('segment')}>
                  <img src={segment} alt="Segment" />
                  Segment Display
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onAddPart('circle')}>
                  <img src={circle} alt="Circle" />
                  Circle
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onAddPart('rect')}>
                  <img src={rect} alt="Rectangle" />
                  Rectangle
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onAddPart('guideline')}>
                  <img src={guide} alt="Guide Line" />
                  Guide Line
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
      <section className="PartsList">
        {parts.map((part) => (
          <PartRow key={part.id} part={part} />
        ))}
      </section>
    </>
  );
}

export default Parts;
