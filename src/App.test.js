import { render, screen, waitFor, act, wait } from '@testing-library/react';
import App from './App';

// Тестируем App
describe('App', () => {
  it('renders navigation', () => {
    render(<App />);

    expect(screen.getByText('Все котики')).toBeInTheDocument();
    expect(screen.getByText('Любимые котики')).toBeInTheDocument();
  })
  it('renders message \'... загружаем котиков ...\'', () => {
    render(<App/>);
    
    expect(screen.getByText('... загружаем котиков ...')).toBeInTheDocument();
  });
 })
