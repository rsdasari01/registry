import { SvelteMap } from "svelte/reactivity" 
import type { UUID } from "./Contact"
import type { Contact } from "$lib/contacts/Contact"

const contacts = new SvelteMap<UUID, Contact>();

export default contacts;