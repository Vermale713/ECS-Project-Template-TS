import jabby, { set_check_function } from "@rbxts/jabby";
import { Phase } from "@rbxts/planck";
import PlankJabbyPlugin from "@rbxts/planck-jabby";
import { scheduler } from "shared/std/scheduler";
import { world } from "shared/std/world";

function startJabby() {
	jabby.register({
		applet: jabby.applets.world,
		name: "world",
		configuration: {
			world: world,
		},
	});
}

scheduler.addPlugin(new PlankJabbyPlugin());
scheduler.addSystem(startJabby, Phase.Startup);

jabby.broadcast_server();
