import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { PALYERS_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PlayersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
  try {
    
    const storagePlayers = await PlayersGetByGroup(group);

    const playerAlreadyExists = storagePlayers?.filter(player => player.name === newPlayer.name);

    if(playerAlreadyExists != undefined && playerAlreadyExists.length > 0) {
      throw new AppError(`Player: ${newPlayer.name} já existe.`)
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer]);
    await AsyncStorage.setItem(`${PALYERS_COLLECTION}-${group}`, storage);

  } catch (error) {
    throw error;
  }
}

