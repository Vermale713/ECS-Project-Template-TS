import { Phase } from "@rbxts/planck";
import { scheduler } from "./scheduler";
import { Players } from "@rbxts/services";

export const PlayerAdded = new Phase();
export const PlayerRemoving = new Phase();

scheduler.insert(PlayerAdded, Players.PlayerAdded);
scheduler.insert(PlayerRemoving, Players.PlayerRemoving);
