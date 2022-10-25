import Icon from 'react-native-vector-icons/Entypo';

import { Header } from "@components/Header";
import { Container, Content, IconItem } from "./styles";
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';

export function NewGroup() {

  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group: 'Time'});
  }

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

        <Input 
          placeholder='Nome da Turma'
        />
        <Button 
          title="Criar"
          style={{ marginTop: 20}}
          onPress={handleNew}
        />
        
      </Content>

    </Container>
  )
}