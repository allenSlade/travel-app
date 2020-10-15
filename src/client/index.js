import { performAction } from './js/app';

// Stylesheets
import './styles/style.scss';
import './styles/aside.scss';
import './styles/footer.scss';
import './styles/header.scss';
import './styles/main.scss';
import './styles/section.scss';

export { performAction };

// Event listener for genrate button
document.getElementById('generate').addEventListener('click', performAction);
