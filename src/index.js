import './styles/root.css';
import './styles/containers.css';
// import './styles/monthview.css';
import './styles/sidebar.css';
import './styles/asideContainers.css';
import './styles/header.css';
import './styles/sbdatepicker.css';
import './styles/aside/form.css';
import './styles/aside/datepicker.css';
import './styles/aside/goto.css';
import './styles/aside/toggleForm.css';
import './styles/aside/sidebarSubMenu.css';
import './styles/aside/changeViewModule.css';
import './styles/aside/editCategoryForm.css';
import './styles/aside/timepicker.css';
import './styles/aside/deleteCategoryPopup.css';
import './styles/aside/entryOptions.css';
import './styles/aside/info.css';
import './styles/aside/shortcuts.css';
import './styles/holidays.css';

import renderViews from './config/renderViews';
import setViews from './config/setViews';
import context, { datepickerContext } from './context/appContext';
import store from './context/store';
// import './styles/sidebar.css'
import { setTheme } from './utilities/helpers';

/* !*************************************! */
setTheme(context, store);

// Render views first to ensure UI is interactive
renderViews(context, datepickerContext, store);

// Load holidays in the background
const currentYear = new Date().getFullYear();
store.loadHolidaysForYear(currentYear).then(() => {
  // Re-render the current view to show holidays
  const currentComponent = context.getComponent();
  setViews(currentComponent, context, store, datepickerContext);
}).catch((error) => {
  console.warn('Failed to load holidays:', error);
});

/*
fetch('http://localhost:3001/store')
  .then((res) => res.json())
  .then((data) => console.log(data))
*/
