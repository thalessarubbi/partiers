import React, { useState, FormEvent } from 'react';

import { Container, InputContainer } from './styles';

interface AddEventProps {
  handleCloseModal: () => void;
  hanldeAddEvent: (
    e: FormEvent,
    name: string,
    address: string,
    date: string,
    shift: string,
    type: string,
  ) => void;
}

const AddEventModal: React.FC<AddEventProps> = ({
  handleCloseModal,
  hanldeAddEvent,
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [shift, setShift] = useState('');
  const [type, setType] = useState('');

  return (
    <Container>
      <h1>Cadastrar evento</h1>
      <form onSubmit={e => hanldeAddEvent(e, name, address, date, shift, type)}>
        <label htmlFor="name">
          Nome do evento
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="address">
          Local
          <input
            id="address"
            name="address"
            type="text"
            value={address}
            onChange={e => {
              setAddress(e.target.value);
            }}
          />
        </label>
        <label htmlFor="type">
          Tipo
          <select
            id="type"
            name="type"
            value={type}
            onChange={e => {
              setType(e.target.value);
            }}
          >
            <option value="" disabled hidden>
              Escolha se o evento deve bloquear seu turno
            </option>
            <option value="block">Bloqueante</option>
            <option value="not">Não bloqueante</option>
          </select>
        </label>
        <InputContainer>
          <div>
            <label htmlFor="date">
              Data
              <input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={e => {
                  setDate(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="shift">
              Turno
              <select
                id="shift"
                name="shift"
                value={shift}
                onChange={e => {
                  setShift(e.target.value);
                }}
              >
                <option value="" disabled hidden>
                  Escolha o turno
                </option>
                <option value="mornign">Manhã</option>
                <option value="afternoon">Tarde</option>
                <option value="night">Noite</option>
              </select>
            </label>
          </div>
        </InputContainer>
        <button type="submit">Adicionar evento</button>
      </form>
      <button type="button" onClick={handleCloseModal}>
        Cancelar
      </button>
    </Container>
  );
};

export default AddEventModal;
