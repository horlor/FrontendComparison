import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodoPage from './components/pages/TodoPage';
import AuthService from './api/UserApi';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from "@date-io/dayjs"
import LoginPage from './components/pages/LoginPage';
import AuthProvider from './components/auth/AuthContext';
import RegisterPage from './components/pages/RegisterPage';
import axios from 'axios';

const queryClient = new QueryClient()
axios.defaults.baseURL="http://localhost:5000"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiPickersUtilsProvider utils={DayJsUtils}>
        <BrowserRouter>
        <AuthProvider>
        <Switch>
          <Route path="/register" exact component={RegisterPage}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/" exact component={TodoPage}/>
          <Route path="/:id" component={TodoPage}/>
          
        </Switch>
        </AuthProvider>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </QueryClientProvider>

  );
}

export default App;
