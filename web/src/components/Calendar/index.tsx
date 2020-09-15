import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { CalendarBox, Header, Container } from './styles';
import ShiftCard from './ShiftCard';

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

interface Availability {
  shift: string;
  available: boolean;
  event?: Event;
}

interface CalendarProps {
  day: number;
  month: number;
  availability: Availability[];
}

const Calendar: React.FC<CalendarProps> = ({ day, month, availability }) => {
  const [dayFormatted, setDayFormatted] = useState('');
  const [morningShift, setMorningShift] = useState<Availability>(
    availability.find(av => av.shift === 'morning') as Availability,
  );
  const [afternoonShift, setAfternoonShift] = useState<Availability>(
    availability.find(av => av.shift === 'afternoon') as Availability,
  );
  const [nightShift, setNightShift] = useState<Availability>(
    availability.find(av => av.shift === 'night') as Availability,
  );

  useEffect(() => {
    const currentDate = new Date(2020, month, day);

    setDayFormatted(format(currentDate, `dd 'de' MMMM`, { locale: ptBR }));
  }, [availability, day, month]);

  return (
    <Container>
      <Header>
        <h1>{dayFormatted}</h1>
      </Header>
      <CalendarBox>
        {morningShift && (
          <ShiftCard
            shift={morningShift.shift}
            event={morningShift.event}
            available={morningShift.available}
          />
        )}
        <hr />
        {afternoonShift && (
          <ShiftCard
            shift={afternoonShift.shift}
            event={afternoonShift.event}
            available={afternoonShift.available}
          />
        )}
        <hr />
        {nightShift && (
          <ShiftCard
            shift={nightShift.shift}
            event={nightShift.event}
            available={nightShift.available}
          />
        )}
      </CalendarBox>
    </Container>
  );
};

export default Calendar;
