import Parts from './Parts/Parts';
import Save from './Save';
import Plate from './Plate';

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
        <Save />
      </section>
    </aside>
  );
}

export default SideBar;
