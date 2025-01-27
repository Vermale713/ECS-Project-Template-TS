import jabby from "@rbxts/jabby";
import { scheduler } from "./scheduler";
import { ContextActionService, Players, RunService } from "@rbxts/services";

export function Start(children: Instance[] | undefined) {
	children?.forEach((module, index) => {
		if (classIs(module, "ModuleScript")) {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			require(module);
		}
	});
	scheduler.runAll();
	jabby.set_check_function((player) => {
		return true;
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
