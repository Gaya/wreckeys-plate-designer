import './SideBar.scss';

function SideBar() {
  return (
    <aside>
      <h2>Plate Settings</h2>
      <fieldset>
        <label htmlFor="type">Plate Type</label>
        <select name="type" id="type">
          <option value="19inch">19" rack</option>
        </select>
      </fieldset>
    </aside>
  );
}

export default SideBar;
