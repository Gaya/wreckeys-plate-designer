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
          <label htmlFor="diameter">Diameter (hole):</label>
          <input
            type="number"
            value={part.options.diameter}
            onChange={(e) => {
              const diameter = parseFloat(e.target.value)
              actions.updatePartOptions(part.id, { diameter });
            }}
          />
        </fieldset>
      )}
      {part.type === 'knob' && (
        <fieldset>
          <label htmlFor="diameter">Mechanism diameter:</label>
          <input
            type="number"
            value={part.options.guideDiameter}
            onChange={(e) => {
              const guideDiameter = parseFloat(e.target.value)
              actions.updatePartOptions(part.id, { guideDiameter });
            }}
          />
        </fieldset>
      )}
    </div>
  );
}

export default PartOptions;
