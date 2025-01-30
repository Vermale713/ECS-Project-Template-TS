import jabby from "@rbxts/jabby";
import { scheduler } from "./scheduler";
import { ContextActionService, Players, RunService } from "@rbxts/services";
import { world } from "./world";
import PlankJabbyPlugin from "@rbxts/planck-jabby";

const GROUP_NUMBER = 1; // Change to groups id
const GROUP_RANK = 250; // Change to desired rank

export function Start(children: Instance[] | undefined) {
	children?.forEach((module, index) => {
		if (classIs(module, "ModuleScript")) {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			require(module);
		}
	});
	scheduler.runAll();
	// Jabby debug
	jabby.set_check_function((player) => {
		if (player.GetRankInGroup(GROUP_NUMBER) > GROUP_RANK) {
			return true;
		}
		return false;
	});
	jabby.register({
		applet: jabby.applets.world,
		name: "world",
		configuration: {
			world: world,
		},
	});
	scheduler.addPlugin(new PlankJabbyPlugin());

	if (RunService.IsClient()) {
		const client = jabby.obtain_client();

		function startJabby(name: string, state: Enum.UserInputState) {
			if (name === "openJabby" && state === Enum.UserInputState.Begin) {
				client.spawn_app(client.apps.home);
			}
		}

		ContextActionService.BindAction("openJabby", startJabby, false, Enum.KeyCode.F4);
	}
}
