import styled, { css } from 'styled-components';

interface ContainerProps {
  type: 'event' | 'available' | 'unavailable';
}

const containerPropsVariation = {
  event: css`
    background: var(--color-primary);
    border-radius: 5px;

    h1 {
      color: var(--color-text-title);
    }
    h3 {
      font-size: 1.4em;
      color: var(--color-text-title);
      font-weight: normal;
    }
  `,
  available: css`
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: var(--color-text-in-primary);
      font-weight: normal;
      opacity: 0.3;
    }
  `,
  unavailable: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-box-secundary);
    border-radius: 5px;

    h1 {
      color: var(--color-text-title);
      font-weight: normal;
    }
  `,
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 25%;
  padding: 2rem;

  ${props => containerPropsVariation[props.type || 'unavailable']}
`;
