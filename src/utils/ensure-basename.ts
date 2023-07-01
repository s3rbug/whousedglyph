import { config } from './config';

if (!window.location.pathname.includes(config.BASE_URL)) {
	window.history.replaceState("", "", config.BASE_URL);
}
