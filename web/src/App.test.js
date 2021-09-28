import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter } from "react-router-dom";
import App from './App';

test('renders learn react link', () => {
  render(<HashRouter><App /></HashRouter>);
  const linkElement = screen.getByText("KamelPortal");
  expect(linkElement).toBeInTheDocument();
});

test('Sum 2 numbers', ()=>{
  expect(2+2).toBe(4);
});

test('Press add kamels button', async ()=>{
  render(<HashRouter><App /></HashRouter>);
  const nameInput = screen.getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: 'Mark' } });
  fireEvent.click(screen.getByTestId("knap"));
  const kamelName = await screen.getByText('Hej Mark',{exact: true});
  expect(kamelName).toBeInTheDocument();
});