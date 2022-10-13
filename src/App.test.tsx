import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  const linkElement1 = screen.getByText(/Tabla de pagos/i);
  const linkElement2 = screen.getByText(/Añadir un pago/i);
  const linkElement3 = screen.getByText(/Ver balance/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});
