import { config } from './config';

if (!window.location.pathname.includes(config.ROUTER_BASE_URL)) {
	window.history.replaceState("", "", config.ROUTER_BASE_URL);
}
