import { Entity, World } from "@rbxts/jecs";
import { Players, Workspace } from "@rbxts/services";
import collect from "shared/std/collect";
import { Character, Player } from "shared/std/components";
import { PlayerAdded, PlayerRemoving } from "shared/std/phases";
import ref from "shared/std/ref";
import { scheduler } from "shared/std/scheduler";

const [addedEvents, addedDisconnect] = collect(Players.PlayerAdded);
const [removingEvents, removedDisconnect] = collect(Players.PlayerRemoving);

const connections: Map<Entity, RBXScriptConnection | undefined> = new Map();

function onPlayerAdded(world: World) {
	for (const [id, player] of addedEvents) {
		const [playerEntity] = ref(player.UserId);
		world.set(playerEntity, Player, player);
		connections.set(
			playerEntity,
			player.CharacterAdded.Connect((rig) => {
				if (rig.Parent !== Workspace) {
					rig.AncestryChanged.Wait();
				}
				world.set(playerEntity, Character, rig);
			}),
		);
	}
}

function onPlayerRemoving(world: World) {
	for (const [id, player] of removingEvents) {
		const [playerEntity] = ref(player.UserId);
		world.clear(playerEntity);
		const connection = connections.get(playerEntity);
		connection?.Disconnect();
		connections.set(playerEntity, undefined);
	}
}

scheduler.addSystem(onPlayerAdded, PlayerAdded);
scheduler.addSystem(onPlayerRemoving, PlayerRemoving);
