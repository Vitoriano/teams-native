import Icon from 'react-native-vector-icons/Entypo';

import { Header } from "@components/Header";
import { Container, Content, IconItem } from "./styles";
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
        
      <Content>
        <IconItem>
          <Icon name="users" size={56} color="#00875F" />
        </IconItem>
         
        <Highlight 
          title="Nova Turma"
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Button 
          title="Criar"
        />
        
      </Content>

    </Container>
  )
}