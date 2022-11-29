import { knobPart } from '../../../parts/knob';
import { holePart } from '../../../parts/hole';

import { useAppContext } from '../../App/AppContextProvider';

interface PartOptionsProps {
  part: PartWithOptions;
}

function PartOptions({ part }: PartOptionsProps) {
  const { actions } = useAppContext();

  return (
    <div className="PartOptions">
      {['knob', 'hole'].includes(part.type) && (
        <fieldset>
          <label htmlFor="diameter">Diameter:</label>
          <input
            type="number"
            value={part.options.diameter}
            onChange={(e) => {
              const diameter = parseFloat(e.target.value)
              let newPart: Part | null = null;

              switch (part.type) {
                case 'knob':
                  newPart = knobPart(diameter, diameter + 10);
                  break;

                case 'hole':
                  newPart = holePart(diameter);
                  break;
              }

              if (newPart) {
                actions.updatePartOptions(part.id, newPart);
              }
            }}
          />
        </fieldset>
      )}
    </div>
  );
}

export default PartOptions;
