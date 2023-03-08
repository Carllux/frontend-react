import './App.css';
import React, { Component } from 'react';

// import Header from './components/Header'
import Login from './pages/Login';
// function App() {
//   return (
//     <div className="App">
//     </div>
//   );
// }
class App extends Component {
  render() {
    return (
      <div className='App'>

        <Login/>
      </div>
    )
  }
}


export default App;
