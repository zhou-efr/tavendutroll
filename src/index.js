import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import logo from '../images/logo.png' ;


ReactDOM.render(
  <React.StrictMode>
    <tiltle>La taverne du troll</tiltle>
    <meta property="og:title" content="La taverne du troll"/>
    <meta name="twitter:title" content="La taverne du troll"/>

    <meta name="description" content="Association de jeux d'EFREI Paris."/>
    <meta property="og:description" content="Association de jeux d'EFREI Paris."/>
    <meta name="twitter:description" content="Your Description"/>

    <meta property="og:image" content={logo}/>
    <meta name="twitter:image" content={logo}/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
