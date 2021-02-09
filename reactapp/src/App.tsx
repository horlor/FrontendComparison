import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodoPage from './components/pages/TodoPage';
import AuthService from './api/AuthService';
import { BrowserRouter, Route } from 'react-router-dom';

AuthService.init();
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Route path="/" exact component={TodoPage}/>
        <Route path="/:id" component={TodoPage}/>
      </BrowserRouter>
    </QueryClientProvider>

  );
}

export default App;
