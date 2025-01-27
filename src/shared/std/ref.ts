import { Entity } from "@rbxts/jecs";
import { world } from "./world";

const refs: Map<unknown, Entity> = new Map();

// Helper function to remove an entity reference by key
function fini(key: unknown): () => void {
	return () => {
		refs.delete(key);
	};
}

// No-op function
function noop(): void {}

// Main function to create or retrieve an entity reference
function ref(key?: unknown): [Entity, () => void] {
	if (key === undefined) {
		return [world.entity(), noop];
	}

	let entity = refs.get(key);
	if (!entity) {
		entity = world.entity();
		refs.set(key, entity);
	}

	// Cannot cache handles because they will get invalidated
	return [entity, fini(key)];
}

export default ref;
