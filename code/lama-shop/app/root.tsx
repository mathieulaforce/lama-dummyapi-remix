import type { MetaFunction } from '@remix-run/node';
import { Analytics } from '@vercel/analytics/react';
import DefaultTheme from './theming/defaultTheme';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box, AppBar, Toolbar, Typography } from '@mui/material';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>
      <body>
        <ThemeProvider theme={DefaultTheme}>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Box display="flex" gap={1}>
                  <Typography variant="h6" component="div">
                    LaMa Shop
                  </Typography>
                  <Typography variant="h6" component="div">
                    <Link to="/Products">Products</Link>
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}
