import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { App } from "./components/app/App";
import { GlyphList } from "./components/glyph/GlyphList";

const history = createBrowserHistory({ window });

const rootRoute = createRootRoute({
  component: App,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: GlyphList,
  validateSearch: (search: Record<string, unknown>): { replay?: string } => {
    const result: { replay?: string } = {};
    if (typeof search["replay"] === "string") {
      result.replay = search["replay"];
    }
    return result;
  },
});

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({
  routeTree,
  history,
  stringifySearch: (search) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(search)) {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    }
    const str = params.toString();
    return str ? `?${str}` : "";
  },
  parseSearch: (searchStr) => {
    const params = new URLSearchParams(searchStr);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
