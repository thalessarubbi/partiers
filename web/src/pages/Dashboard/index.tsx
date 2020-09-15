import React, { useState, useCallback, useEffect } from 'react';

import { Container, CalendarContainer, EventModal } from './styles';
import Calendar from '../../components/Calendar';
import AddEventModal from '../../components/AddEventModal';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

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

interface DayAvailability {
  day: number;
  availability: Availability[];
}

interface WeekAvailability {
  month: number;
  dayAvailabilities: DayAvailability[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [weekAvailability, setWeekAvailability] = useState<WeekAvailability>();

  const handleOpenEventModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseEventModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleCreateEventSubmit = useCallback(
    async (e, name, address, date, shift, type) => {
      e.preventDefault();
      const selectedDate = new Date(date);

      switch (shift) {
        case 'morning':
          selectedDate.setHours(9, 0, 0, 0);
          break;
        case 'afternoon':
          selectedDate.setHours(13, 0, 0, 0);
          break;
        case 'night':
          selectedDate.setHours(18, 0, 0, 0);
          break;
        default:
          break;
      }

      try {
        await api.post('events', {
          partier_id: user.id,
          name,
          date: selectedDate.toISOString(),
          address,
          blocker: type === 'blocker',
        });

        handleCloseEventModal();

        addToast({
          type: 'success',
          title: 'Evento criado com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar evento',
          description: err.message,
        });
      }
    },
    [addToast, handleCloseEventModal, user.id],
  );

  useEffect(() => {
    async function fetchWeekAvailability() {
      const currentDate = new Date();
      const params = new URLSearchParams();

      params.append('date', currentDate.toISOString());

      const response = await api.get('partiers/month-availability', { params });

      setWeekAvailability(response.data);
    }
    fetchWeekAvailability();
  }, []);
  return (
    <>
      <Container>
        <CalendarContainer
          cellAlign="center"
          withoutControls
          slidesToShow={1.25}
        >
          {weekAvailability &&
            weekAvailability.dayAvailabilities.map(dayAvailability => (
              <Calendar
                key={dayAvailability.day}
                day={dayAvailability.day}
                month={weekAvailability.month}
                availability={dayAvailability.availability}
              />
            ))}
        </CalendarContainer>
        <button type="button" onClick={handleOpenEventModal}>
          Adicionar evento
        </button>
      </Container>
      {showModal && (
        <EventModal>
          <AddEventModal
            handleCloseModal={handleCloseEventModal}
            hanldeAddEvent={handleCreateEventSubmit}
          />
        </EventModal>
      )}
    </>
  );
};

export default Dashboard;
