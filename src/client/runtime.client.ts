import { logTodo } from "shared/std/logger";
import { scheduler } from "shared/std/scheduler";
import { Start } from "shared/std/start";

logTodo("Make the client");

const children = script.Parent!.FindFirstChild("systems")!.GetChildren();

Start(children);
