import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders task table', () => {
  render(<App />);
  const taskTitle = screen.getByText(/All Tasks/i);
  expect(taskTitle).toBeInTheDocument();
});
