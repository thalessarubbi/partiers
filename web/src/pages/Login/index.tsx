import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, CardContainer } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        await signIn({
          email,
          password,
        });

        history.push('/dashboard');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [addToast, email, history, password, signIn],
  );

  return (
    <Container>
      <h1>Entrar</h1>
      <CardContainer>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="email">
            E-mail
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label id="password" htmlFor="password">
            Senha
            <input
              name="password"
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button type="submit">Entrar</button>
        </form>
        <button type="button">Esqueci minha senha</button>
        <hr />
        <span>Não possui uma conta?</span>
        <button type="button">Criar conta</button>
      </CardContainer>
    </Container>
  );
};

export default Login;
