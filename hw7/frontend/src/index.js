import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import { ScoreCardProvider } from './hooks/useScoreCard';

ReactDOM.render(
  <ScoreCardProvider>
    <App />
  </ScoreCardProvider>,
  document.getElementById('root'),
);