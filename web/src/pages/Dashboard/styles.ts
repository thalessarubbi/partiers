import styled from 'styled-components';
import Carousel from 'nuka-carousel';

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  button {
    width: 70%;
    height: 7.5%;
    background: transparent;
    margin-top: 4.8%;
    border: 1px solid var(--color-box-base);
    border-radius: 5px;
    color: var(--color-box-base);
    font-size: 1.13em;
  }
`;

export const CalendarContainer = styled(Carousel)`
  width: 100% !important;
  height: 80% !important;
  margin-top: 2rem;

  li {
    display: flex !important;
    align-items: center;
    justify-content: space-evenly;
  }
`;

export const EventModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
