import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Index from "./pages/index";
import Code from "./pages/code";
import Info from "./pages/info";
import NotFound from "./pages/error/NoFound";
import { Layout } from 'antd';
import Menu from './common/menu';
import Header from './common/head';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Menu />
          <Layout>
            <Header />

            <Layout.Content>
              <Switch>
                {/* 文档首页 */}
                <Route exact={true} path="/" component={Index} />
                {/* 文档的代码查询 */}
                <Route exact={true} component={Code} path="/code" />
                {/* 文档的代码查询 */}
                <Route exact={true} component={Info} path="/info" />

                <Route exact={true} component={NotFound} path="*" />
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
