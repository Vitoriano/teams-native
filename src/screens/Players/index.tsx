import { Alert, FlatList } from "react-native";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import React, { useCallback, useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { PlayersGetByGroup } from "@storage/players/playersGetByGroup";
import { AppError } from "@utils/AppError";
import { playersGetByGroupAndTeam } from "@storage/players/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";

type RouteParams = {
  group: string;
}

export function Players() {

  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0 ){
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      
      await playerAddByGroup(newPlayer, group);
      await fetchPlayersByteam();

    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Nova Pessoa', error._message);
      }
    }
  }

  async function fetchPlayersByteam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPlayersByteam();
    }, [team, newPlayerName])
  );

  return (
    <Container >
      <Header  showBackButton />

      <Highlight 
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input 
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />

        <ButtonIcon 
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
          <FlatList 
            data={['Time A', 'Time B']}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Filter 
                title={item}
                isActive={item === team}
                onPress={() => setTeam(item)}
              />
            )}
            horizontal
          />

          <NumbersOfPlayers>
            {players.length}
          </NumbersOfPlayers>
      </HeaderList>
     
      <FlatList 
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item.name}
            onRemove = {() => {}}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100},
          players.length === 0 && { flex: 1}
        ]}
        ListEmptyComponent={() => (
          <ListEmpty 
            message="Não há pessoas nesse time!" 
          />
        )}
      />
     
      <Button 
        title="Remover Turma"
        type="SECONDARY"
      />
    </Container>
  )
}