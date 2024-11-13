import React from "react";
import { BrowserRouter as Router, } from "react-router-dom";

import { createRoot } from 'react-dom/client';
import { HelloWorld } from "react-components-library/components";

const appContainer = document.getElementById('app');
const root = createRoot(appContainer!);


export const renderApp = () => root.render(
    <Router>
         <HelloWorld  />
    </Router>
);

renderApp();
