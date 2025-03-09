import { createRoot } from "react-dom/client";
import {
  ErrorResponse,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  useRouteError,
} from "react-router";
import { routes } from "./routes";
import * as appRoot from "./root";

const resolveErrorBoundaries = (routes: RouteObject[] = []) =>
  routes.map(({ ErrorBoundary, children, ...route }) => ({
    ...route,
    ...(ErrorBoundary && {
      ErrorBoundary: (props: any) => {
        const error = useRouteError() as Error | ErrorResponse | unknown;
        const errorInstance =
          error instanceof Error || (typeof error === "object" && error && "data" in error)
            ? (error as Error)
            : new Error(error ? JSON.stringify(error) : "Unknown Error");
        return <ErrorBoundary {...props} error={errorInstance} />;
      },
    }),
    ...(children ? { children: resolveErrorBoundaries(children) } : {}),
  }));

const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <appRoot.default />,
    ErrorBoundary: appRoot.ErrorBoundary,
    children: [
      ...routes,
      {
        path: "*",
        loader: () => {
          throw new Response(null, { status: 404 });
        },
      },
    ],
  },
];

const isGHPages = window.location.hostname.includes("github.io");
const isElectron = navigator.userAgent.toLowerCase().includes("electron");
const useHashRouter = isGHPages || isElectron;
const createRouter = useHashRouter && createHashRouter || createBrowserRouter;
const router = createRouter(resolveErrorBoundaries(appRoutes));

const root = document.getElementById("root");
if (root) createRoot(root).render(<RouterProvider router={router} />);
