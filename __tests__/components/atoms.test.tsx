import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Chip, TypeBadge } from '@/components/atoms';
import { StatBar } from '@/components/molecules';

describe('atoms & molecules', () => {
  it('TypeBadge renders a formatted type and handles press', () => {
    const onPress = jest.fn();
    render(<TypeBadge type="fire" onPress={onPress} />);
    fireEvent.press(screen.getByRole('button', { name: 'fire type' }));
    expect(screen.getByText('Fire')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Chip exposes selected state', () => {
    render(<Chip label="Grass" selected onPress={() => {}} />);
    expect(screen.getByRole('button').props.accessibilityState).toMatchObject({
      selected: true,
    });
  });

  it('StatBar shows label and value', () => {
    render(<StatBar label="HP" value={45} max={255} />);
    expect(screen.getByText('HP')).toBeTruthy();
    expect(screen.getByText('45')).toBeTruthy();
  });
});
