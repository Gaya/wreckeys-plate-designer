import { useCallback, useState } from 'react';

import { useAppContext } from '../../App/AppContextProvider';
import Modal from '../../Modal/Modal';

import knob from './knob.svg';
import slider from './slider.svg';
import segment from './segment.svg';
import hole from './hole.svg';

import './Parts.scss';

function Parts() {
  const { state } = useAppContext();

  const { parts } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const openModal = useCallback(() => setIsModalOpen(true), []);

  return (
    <>
      <Modal open={isModalOpen} onClose={closeModal}>
        {isModalOpen && (
          <section className="parts-options">
            <ul>
              <li>
                <button type="button">
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
                <button>
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

        {parts.map((part) => (
          <div key={part.id}>
            {part.name}
          </div>
        ))}
      </fieldset>
    </>
  );
}

export default Parts;
