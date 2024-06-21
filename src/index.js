import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SkeletonTheme baseColor="#bcbcbc" highlightColor="#ddd">
    <App />
    </SkeletonTheme>
);

