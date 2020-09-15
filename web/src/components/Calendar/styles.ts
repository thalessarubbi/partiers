import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 70%;
  margin: 6.6% 0 0 4.8%;

  h1 {
    color: var(--color-text-title);
    font-weight: normal;
  }
`;

export const CalendarBox = styled.div`
  width: 35rem;
  height: 57.2rem;
  display: flex;
  flex-direction: column;
  background: var(--color-box-base);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.17);
  border-radius: 5px;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
  margin-top: 2rem;

  hr {
    width: 100%;
    height: 1rem;
    background: var(--color-line-diver);
    border: 0;
    border-radius: 5px;
  }
`;
