import { useState } from 'react';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import * as S from './styles';
import { FlatList } from 'react-native';

export default function Groups() {

  const [groups, setGroups] = useState<string[]>(['Dev Na Rotina', 'Meu Time']);

  return (
    <S.Container>
     <Header />
     <Highlight 
        title="Turmas" 
        subtitle='Jogue com a sua turma'
      />
      <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard  
              title={item}
            />
          )}

      />
    </S.Container>
  );
}
