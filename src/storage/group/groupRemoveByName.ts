import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYERS_COLLECTION,GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupRemoveByName(groupName: string) {
  try {
    
    const storageGroups = await groupsGetAll();
    const groups = storageGroups.filter(group => group !== groupName);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYERS_COLLECTION}-${groupName}`);

  } catch (error) {
    throw error;
  }
}