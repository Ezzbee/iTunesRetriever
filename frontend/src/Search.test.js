import React from 'react'; 
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'; 
import App from './App';
import Search from "./components/Search";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


test('renders Search component correctly', () => { 
  const tree = renderer 
  .create(<Search />) 
    .toJSON(); 
  expect(tree).toMatchSnapshot(); 
}); 
