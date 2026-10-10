import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio home page', () => {
  render(<App />);
  expect(screen.getByText(/Hi, I'm/i)).toBeInTheDocument();
  expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
});
