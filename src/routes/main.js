import React from 'react';
import Home from '../pages/Home';
import Character from '../pages/Character';
import History from '../pages/History';
import About from '../pages/About';

export default function routesMain(renderRoutes, pathname) {
  let willRender = renderRoutes;
  if (pathname === '/') {
    willRender = <Home />;
  }
  if (pathname.startsWith('/character')) {
    willRender = <Character />;
  }
  if (pathname === '/history') {
    willRender = <History />;
  }
  if (pathname === '/about') {
    willRender = <About />;
  }
  return willRender;
}
