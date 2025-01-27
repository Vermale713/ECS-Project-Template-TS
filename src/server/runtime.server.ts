import { logTodo } from "shared/std/logger";
import { Start } from "shared/std/start";

logTodo("Make the server");

const children = script.Parent!.FindFirstChild("systems")!.GetChildren();

Start(children);
