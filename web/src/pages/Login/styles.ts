import styled from 'styled-components';

import backgroundImg from '../../assets/clown_image.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background: var(--color-background-overlay), url(${backgroundImg});
  background-size: cover;

  h1 {
    color: var(--color-text-title);
    font-weight: normal;
    font-size: 4rem;
  }
`;

export const CardContainer = styled.div`
  width: 45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--color-box-base);
  border-radius: 5px;
  padding: 4rem;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem 0 2rem;

    label {
      display: flex;
      flex-direction: column;
      color: var(--color-text-label);
      font-size: 1.8rem;
      margin-top: 2rem;
      font-weight: normal;

      input {
        height: 4rem;
        border: 1px solid #cccccc;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 1rem 0 2rem 0;
        padding: 1rem;
      }
    }

    button {
      height: 5rem;
      background: var(--color-background);
      border: 0;
      border-radius: 5px;
      color: var(--color-text-title);
      font-size: 1.8em;
      margin-top: 8rem;
    }
  }

  > button:first-of-type {
    align-self: flex-end;
    color: var(--color-text-in-secundary);
    border: 0;
    background: transparent;
    padding-right: 2rem;
    font-size: 1.6rem;
    margin: 1rem 0 2.5rem 0;
  }

  hr {
    width: 100%;
    height: 0.2rem;
    background: var(--color-line-diver);
    border: 0;
    border-radius: 5px;
    margin: 5rem 0 5rem;
  }

  span {
    color: var(--color-text-label);
    font-size: 1.6rem;
  }

  > button {
    color: var(--color-primary);
    border: 0;
    background: transparent;
    padding-right: 2rem;
    font-size: 1.6rem;
    margin-top: 2.5rem;
  }
`;
