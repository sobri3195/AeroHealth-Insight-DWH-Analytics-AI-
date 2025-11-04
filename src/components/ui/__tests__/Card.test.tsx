import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <Card title="Test Title">
        <p>Content</p>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <Card title="Title" subtitle="Test Subtitle">
        <p>Content</p>
      </Card>
    );

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Content</p>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.classList.contains('custom-class')).toBe(true);
  });
});
