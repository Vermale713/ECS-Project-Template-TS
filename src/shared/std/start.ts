import jabby from "@rbxts/jabby";
import { scheduler } from "./scheduler";
import { ContextActionService, Players, RunService } from "@rbxts/services";

const GROUP_NUMBER = 34902540;
const GROUP_RANK = 250;

export function Start(children: Instance[] | undefined) {
	children?.forEach((module, index) => {
		if (classIs(module, "ModuleScript")) {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			require(module);
		}
	});
	scheduler.runAll();
	jabby.set_check_function((player) => {
		if (player.GetRankInGroup(GROUP_NUMBER) > GROUP_RANK) {
			return true;
		}
		return false;
	});
	if (RunService.IsClient()) {
		const player = Players.LocalPlayer;
		const playerGui = player.WaitForChild("PlayerGui");
		const client = jabby.obtain_client();

		function startJabby(name: string, state: Enum.UserInputState) {
			if (name === "openJabby" && state === Enum.UserInputState.Begin) {
				client.spawn_app(client.apps.home);
			}
		}

		ContextActionService.BindAction("openJabby", startJabby, false, Enum.KeyCode.F4);
	}
}
