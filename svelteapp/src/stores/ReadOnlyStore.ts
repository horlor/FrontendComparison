import type {Writable, Readable} from "svelte/store";

function readOnly<T>(store: Writable<T>): Readable<T>{
	return {subscribe: store.subscribe}
}

export default readOnly;