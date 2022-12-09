import Parts from './Parts/Parts';
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
    </aside>
  );
}

export default SideBar;
