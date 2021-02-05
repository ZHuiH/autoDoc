import React from 'react';
import './App.css';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import * as V2  from "./pages/v2";
import * as V1 from "./pages/v1/home";
import NotFound from "./pages/NoFound";
import { Layout } from 'antd';
import Menu from './common/v2/menu';
import Header from './common/v2/head';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Header/>
          <Layout>
            <Menu/>
            <Layout.Content>
              <Switch>
                <Route exact={true} component={V1.Home} path="/v1"></Route>
                <Route exact={true} component={V2.Index} path="/"></Route>
                <Route exact={true} component={NotFound} path="*"></Route>
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
