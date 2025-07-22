// src/components/__tests__/AttractionTimetable.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AttractionTimetable from '../AttractionTimetable';
import { describe, it, expect } from 'vitest';


describe('AttractionTimetable', () => {
  it('displays list of opening hours when hours are provided', () => {
    const mockHours = ['Monday: 9AM - 5PM', 'Tuesday: 10AM - 6PM'];

    render(<AttractionTimetable hours={mockHours} />);

    // Check for heading
    expect(screen.getByRole('heading', { name: /opening hours/i })).toBeInTheDocument();

    // Check each item is in the document
    mockHours.forEach(hour => {
      expect(screen.getByText(hour)).toBeInTheDocument();
    });
  });

  it('displays fallback message when hours array is empty', () => {
    render(<AttractionTimetable hours={[]} />);

    expect(screen.getByText('No opening hours available.')).toBeInTheDocument();
  });
});
