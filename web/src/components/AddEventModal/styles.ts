import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 45rem;
  background: var(--color-box-base);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.17);
  border-radius: 5px;

  h1 {
    margin: 3.7rem 0 0 3.3rem;
    color: var(--color-primary);
    font-weight: normal;
  }

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 4rem;
    padding: 0 5rem;

    label {
      display: flex;
      flex-direction: column;
      color: var(--color-text-label);
      font-size: 1.8rem;
      margin-bottom: 1rem;
      font-weight: normal;

      input,
      select {
        height: 4rem;
        border: 1px solid #cccccc;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 2rem 0;
        padding: 1rem;
      }
    }

    button {
      height: 5rem;
      background: var(--color-background);
      margin-bottom: 6.6%;
      border: 0;
      border-radius: 5px;
      color: var(--color-text-title);
      font-size: 1.13em;
    }
  }

  > button {
    color: var(--color-text-label);
    border: 0;
    background: transparent;
    margin-bottom: 2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0;

  div {
    display: flex;
    flex-direction: column;
    width: 48%;
  }
`;
