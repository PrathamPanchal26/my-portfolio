import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio home page', () => {
  render(<App />);
  expect(screen.getByText(/Hi, I'm/i)).toBeInTheDocument();
  expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
});

test('renders projects including Kanha Construction, Admin Portal, and Spotify Bollywood', () => {
  window.history.pushState({}, 'Projects', '/projects');
  render(<App />);
  expect(screen.getAllByText(/Kanha Construction/i)[0]).toBeInTheDocument();
  expect(screen.getByText(/Kanha Admin Portal/i)).toBeInTheDocument();
  expect(screen.getByText(/Spotify Bollywood/i)).toBeInTheDocument();
});

