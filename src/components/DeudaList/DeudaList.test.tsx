import { render, screen } from '@testing-library/react';
import DeudaList from './DeudaList';

test('it should give correct answer when calculating deudas', () => {
  const balances = [
    {personaName: 'Francisco Buyo', importe: 61.32},
    {personaName: 'Alfonso Pérez', importe: 24.72},
    {personaName: 'Raúl González', importe: -38.68},
    {personaName: 'Jose María Gutiérrez', importe: -38.68},
    {personaName: 'Ana Durán', importe: -8.68},
  ]

  render(<DeudaList balances={balances}/>);

  expect(screen.getByText(/Raúl González le debe a Francisco Buyo 38.68 euros/i)).toBeInTheDocument();
  expect(screen.getByText(/Jose María Gutiérrez le debe a Alfonso Pérez 24.72 euros/i)).toBeInTheDocument();
  expect(screen.getByText(/Jose María Gutiérrez le debe a Francisco Buyo 13.96 euros/i)).toBeInTheDocument();
  expect(screen.getByText(/Ana Durán le debe a Francisco Buyo 8.68 euros/i)).toBeInTheDocument();
  
});