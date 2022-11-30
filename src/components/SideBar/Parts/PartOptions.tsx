import { useAppContext } from '../../App/AppContextProvider';

interface PartOptionsProps {
  part: PartWithOptions;
}

function PartOptions({ part }: PartOptionsProps) {
  const { actions } = useAppContext();

  return (
    <div className="PartOptions">
      {'diameter' in part.options && (
        <fieldset>
          <label htmlFor="diameter">Diameter (hole):</label>
          <input
            id="diameter"
            type="number"
            value={part.options.diameter}
            onChange={(e) => {
              const diameter = parseFloat(e.target.value)
              actions.updatePartOptions(part.id, { diameter });
            }}
          />
        </fieldset>
      )}
      {'guideDiameter' in part.options && (
        <fieldset>
          <label htmlFor="guideDiameter">Mechanism diameter:</label>
          <input
            id="guideDiameter"
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
