import { describe, it, vi, beforeAll, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import ChatBot from '../ChatBot';

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn(); 
});

describe('ChatBot', () => {
  it('renders chat button initially', () => {
    const { container } = render(<ChatBot />);
    const toggleButton = container.querySelector('.chatbot-button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('opens chat interface when button is clicked', () => {
    const { container } = render(<ChatBot />);
    const toggleButton = container.querySelector('.chatbot-button')!;
    fireEvent.click(toggleButton);
    expect(screen.getByText(/AI Chatbot/i)).toBeInTheDocument();
  });

  it('shows FAQ when FAQ button is clicked', () => {
    const { container } = render(<ChatBot />);
    fireEvent.click(container.querySelector('.chatbot-button')!);
    fireEvent.click(screen.getByText('FAQ'));
    expect(screen.getByText(/FAQ:/i)).toBeInTheDocument();
  });

  it('shows error if sending empty input', () => {
    const { container } = render(<ChatBot />);
    fireEvent.click(container.querySelector('.chatbot-button')!);
    fireEvent.click(screen.getByText('Send'));
    expect(screen.getByText(/Error! Please ask a question!/i)).toBeInTheDocument();
  });

  it('clears chat history when Clear is clicked', () => {
    const { container } = render(<ChatBot />);
    fireEvent.click(container.querySelector('.chatbot-button')!);
    const input = screen.getByPlaceholderText(/Enter your questions here!/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText('Send'));
    const buttons = screen.getAllByRole('button');
    const clearButton = buttons[buttons.length - 1]; 
    fireEvent.click(clearButton);
    expect(screen.queryByText(/You:/i)).not.toBeInTheDocument();
  });
});
