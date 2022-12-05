import DXF from './DXF';
import Plate from './Plate';
import Parts from './Parts/Parts';

import './SideBar.scss';

function SideBar() {
  return (
    <aside>
      <section className="sidebar-option">
        <Plate />
      </section>
      <section className="sidebar-option sidebar-option-grow">
        <Parts />
      </section>
      <section className="sidebar-option">
        <DXF />
      </section>
    </aside>
  );
}

export default SideBar;
