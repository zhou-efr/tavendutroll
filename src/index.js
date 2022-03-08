import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import logo from '../images/logo.png' ;
import {Auth0Provider} from "@auth0/auth0-react";


ReactDOM.render(
  <Auth0Provider
      domain="dev-67dg30lk.us.auth0.com"
      clientId="jCt4sdZfOiNakOF0EMvU9Ol9FWJ1OaHj"
      redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
