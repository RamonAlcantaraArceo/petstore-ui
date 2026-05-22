/**
 * Petstore Demo — React Entry Point
 *
 * Mounts the PetstoreApp shell into the #root element.
 * Built with: vite build --config vite.bootstrap.config.ts
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PetstoreApp } from '../components/organisms/PetstoreApp';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Missing #root element — check petstore/index.html');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <PetstoreApp />
  </React.StrictMode>,
);
