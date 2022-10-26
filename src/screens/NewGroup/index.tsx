import Icon from 'react-native-vector-icons/Entypo';

import { Header } from "@components/Header";
import { Container, Content, IconItem } from "./styles";
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {

  const navigation = useNavigation();

  const [group, setGroup] = useState('');

  async function handleNew() {

    try {

      await groupCreate(group);
      navigation.navigate('players', { group });

    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Novo Grupo', error._message)
        setGroup('');
      }
      console.log(error);
    }
    
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
          onChangeText={setGroup}
          value={group}
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