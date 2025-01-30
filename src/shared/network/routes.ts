import Squash, { frombuffer, tobuffer } from "@rbxts/squash";
import { Route } from "@rbxts/yetanothernet";
import { logTodo } from "shared/std/logger";

// Replace all Place holders with actual stuff
export const placeHolder = new Route();

const placeHolderSerDes = Squash.boolean();

placeHolder.addIncomingMiddleware((_buffer) => {
	if (!typeIs(_buffer, "buffer")) {
		return undefined;
	}

	const cursor = frombuffer(_buffer);
	return placeHolderSerDes.des(cursor);
});

placeHolder.addOutgoingMiddleware((loaded: boolean) => {
	const cursor = Squash.cursor();
	placeHolderSerDes.ser(cursor, loaded);

	return tobuffer(cursor);
});
