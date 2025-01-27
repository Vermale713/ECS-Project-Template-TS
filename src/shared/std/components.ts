import { Name } from "@rbxts/jecs";
import { world } from "./world";

export const Player = world.component<Player>();
export const Character = world.component<Model>();

world.set(Player, Name, "Player");
