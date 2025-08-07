import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import AttractionTimetable from '../AttractionTimetable';
import '@testing-library/jest-dom';

// Mock the current date to be Wednesday
beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2025-08-06T12:00:00')); // August 6, 2025 is a Wednesday
});

afterAll(() => {
  vi.useRealTimers();
});

describe('AttractionTimetable', () => {
  it('renders the Open Hours heading', () => {
    render(<AttractionTimetable hours={[]} />);
    expect(screen.getByText(/Open Hours/i)).toBeInTheDocument();
  });

  it('shows a message when no hours are provided', () => {
    render(<AttractionTimetable hours={[]} />);
    expect(screen.getByText(/No opening hours available/i)).toBeInTheDocument();
  });

    it('renders all days with correct day and time', () => {
    const sampleHours = [
      'Monday: 10:00AM–6:00PM',
      'Tuesday: 10:00AM–6:00PM',
      'Wednesday: 10:00AM–6:00PM',
      'Thursday: 10:00AM–6:00PM',
      'Friday: 10:00AM–6:00PM',
      'Saturday: 10:00AM–6:00PM',
      'Sunday: Closed',
    ];

    render(<AttractionTimetable hours={sampleHours} />);

    sampleHours.forEach(hour => {
      const [day, time] = hour.split(': ');
      expect(screen.getByText(day)).toBeInTheDocument();
      expect(screen.getAllByText(time).length).toBeGreaterThan(0); // <-- FIX HERE
    });
  });


  it('applies green hover background to the current day (Wednesday)', () => {
    const sampleHours = [
      'Monday: 10:00AM–6:00PM',
      'Tuesday: 10:00AM–6:00PM',
      'Wednesday: 10:00AM–6:00PM',
      'Thursday: 10:00AM–6:00PM',
      'Friday: 10:00AM–6:00PM',
    ];

    const { container } = render(<AttractionTimetable hours={sampleHours} />);

    // There should be one element with the green hover class
    const greenHoverElements = container.querySelectorAll('.hover\\:bg-green-500');
    expect(greenHoverElements.length).toBe(1);
    expect(greenHoverElements[0].textContent).toContain('Wednesday');
  });
});