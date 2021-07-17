import React, {useState} from 'react';
import axios from 'axios';
import * as S from './styled';
import {useHistory} from 'react-router-dom';

function Home() {
  // class é palavra reservada no JS, por isso, para JSX usa-se className
  // o componente input possui as seguintes propriedades

  // <> asdsda </> é um fragment -> permite acesso aos elementos la dentro sem 
  // especificar com uma div por exemplo

  const history = useHistory();
  const [ usuario, setUsuario ]= useState('');
  const [ erro, setErro] = useState(false);

  function handlePesquisa(){
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => {
      const repositories = response.data;
      const repositoriesName = [];
      repositories.map( (repository) => {
        repositoriesName.push(repository.name);
      });
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);
      history.push('/repositories');
    }).catch( erro => {
      setErro(true);
    });
  }
  return (
    <S.HomeContainer>
      <S.Content> 
        <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handlePesquisa} > PESQUISAR </S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : ''}
    </S.HomeContainer>
  );
}

export default Home;


// Este códifo é um JSX -> é um html só que dentro do javascript