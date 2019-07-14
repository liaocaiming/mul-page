import * as React from 'react';

import * as ReactDom from 'react-dom';

import Home from './Home';

const container: HTMLElement = document.getElementById('app') as HTMLElement;

ReactDom.render(
    <Home />,
    container
);