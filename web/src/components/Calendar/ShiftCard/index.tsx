import React, { useState, useEffect } from 'react';
import { Container } from './styles';

interface Event {
  id: string;
  name: string;
  date: Date;
  shift: string;
  address: string;
  blocker: boolean;
  created_at: Date;
  updated_at: Date;
  partier_id: string;
  owner_id: string;
}

interface ShiftCard {
  shift: string;
  event?: Event;
  available: boolean;
}

const ShiftCard: React.FC<ShiftCard> = ({ shift, event, available }) => {
  const [currentShift, setCurrentShift] = useState('');

  useEffect(() => {
    switch (shift) {
      case 'morning':
        setCurrentShift('Manhã');
        break;
      case 'afternoon':
        setCurrentShift('Tarde');
        break;
      default:
        setCurrentShift('Noite');
        break;
    }
  }, [shift]);

  if (event) {
    return (
      <Container type="event">
        <h1>{event.name}</h1>
        <h3>{event.address}</h3>
      </Container>
    );
  }
  if (!available) {
    return (
      <Container type="unavailable">
        <h1>NÃO DISPONÍVEL</h1>
      </Container>
    );
  }
  return (
    <Container type="available">
      <h1>{currentShift}</h1>
    </Container>
  );
};

export default ShiftCard;
