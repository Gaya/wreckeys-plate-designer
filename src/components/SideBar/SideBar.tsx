import DXF from './DXF';
import Plate from './Plate';

import './SideBar.scss';

function SideBar() {
  return (
    <aside>
      <section className="sidebar-option">
        <Plate />
      </section>
      <section className="sidebar-option sidebar-option-grow">
        <h2>Parts</h2>
      </section>
      <section className="sidebar-option">
        <DXF />
      </section>
    </aside>
  );
}

export default SideBar;
