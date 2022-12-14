import { Alert, FlatList, TextInput } from "react-native";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import React, { useCallback, useState, useRef } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useFocusEffect, useRoute, useNavigation } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { PlayersGetByGroup } from "@storage/players/playersGetByGroup";
import { AppError } from "@utils/AppError";
import { playersGetByGroupAndTeam } from "@storage/players/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { PlayerRemoveByGroup } from "@storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
}

export function Players() {

  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const navigation = useNavigation();

  const route = useRoute();
  const newPlayerNameInputRef = useRef<TextInput>(null);

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
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
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

  async function handleRemovePlayer(playerName: string) {
      try {
        
        await PlayerRemoveByGroup(playerName, group);
        fetchPlayersByteam();

      } catch (error) {
        console.log(error);
      }
  }

  async function handleRmeove() {

    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja remover o grupo ?',
      [
        {text: 'N??o', style: 'cancel'},
        {text: 'Sim', onPress: () => handleRmeove() }
      ]
    )
   
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
          value={newPlayerName}
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          inputRef={newPlayerNameInputRef}
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
            onRemove = {() => handleRemovePlayer(item.name)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100},
          players.length === 0 && { flex: 1}
        ]}
        ListEmptyComponent={() => (
          <ListEmpty 
            message="N??o h?? pessoas nesse time!" 
          />
        )}
      />
     
      <Button 
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}