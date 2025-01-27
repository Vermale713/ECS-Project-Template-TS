/**
 * Used for logging non gamebreaking errors
 * @param message - The message to log.
 * @param name - (Optional) The name to use when logging, defaults to "WARNING".
 */
export function logWarn(message: string, name?: string) {
	warn(`[${string.upper(name || "warning")}]: ${message} \n ${debug.traceback()}`);
}

/**
 * Used for logging gamebreaking errors
 * @param message - The message to log.
 * @param name - (Optional) The name to use when logging, defaults to "ERROR".
 */
export function logError(message: string, name?: string) {
	error(`[${string.upper(name || "error")}]: ${message} \n ${debug.traceback()}`);
}

/**
 * Used as a reminder of the todo every time the game loads.
 * @param message - The message to log.
 * @param name - (Optional) The name to use when logging, defaults to "TODO".
 */
export function logTodo(message: string, name?: string) {
	warn(`[${string.upper(name || "todo")}]: ${message}`);
}
