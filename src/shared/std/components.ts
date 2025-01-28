import { Name } from "@rbxts/jecs";
import { world } from "./world";
import { ICharacter, IData } from "shared/types";

export const Player = world.component<Player>();
export const Character = world.component<ICharacter>();
export const Data = world.component<IData>();

world.set(Player, Name, "Player");
