import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { PALYERS_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function PlayersGetByGroup(group: string){

  try {

    const storage = await AsyncStorage.getItem(`${PALYERS_COLLECTION}-${group}`);

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;
    
  } catch (error) {
    console.log(error);
  }
}