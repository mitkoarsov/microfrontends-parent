import {
  lazy,
  Suspense,
  useState,
  type ComponentType,
  type ReactElement,
} from "react";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import "./App.css";
import { ErrorBoundary } from "./error-boundary";

const App1: ComponentType = lazy(() => import("app1/App"));
const App2: ComponentType = lazy(() => import("app2/App"));

const drawerWidth = 220;
type Route = "home" | "app1" | "app2";
const NAV_ITEMS: readonly Route[] = ["home", "app1", "app2"] as const;

const App = (): ReactElement => {
  const [route, setRoute] = useState<Route>("home");

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1400 }}>
        <Toolbar>
          <Typography variant="h6">Microfrontends – Parent</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
        }}
      >
        <Toolbar />
        <List>
          {NAV_ITEMS.map((key) => (
            <ListItemButton
              key={key}
              selected={route === key}
              onClick={(): void => setRoute(key)}
            >
              <ListItemText primary={key.toUpperCase()} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {route === "home" && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Home
            </Typography>
            <Typography>
              Parent owns global state (app names & bg colors). Children have
              local state.
            </Typography>
          </Box>
        )}
        {route === "app1" && (
          <ErrorBoundary fallback={<div>Couldn’t load App1.</div>}>
            <Suspense fallback={<div>Loading App1…</div>}>
              <App1 />
            </Suspense>
          </ErrorBoundary>
        )}
        {route === "app2" && (
          <ErrorBoundary fallback={<div>Couldn’t load App2.</div>}>
            <Suspense fallback={<div>Loading App2…</div>}>
              <App2 />
            </Suspense>
          </ErrorBoundary>
        )}
      </Box>
    </Box>
  );
};

export default App;
