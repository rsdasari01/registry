import { SvelteMap } from "svelte/reactivity" 
import type { UUID } from "./Contact"
import type { Contact } from "$lib/contacts/Contact"

const contacts = new SvelteMap<UUID, Contact>();

contacts.set(<UUID>"UUID", {uuid: <UUID>"UUID", name: "Bob Dobbington", relation: "Father", employer: "IBM"});
contacts.set(<UUID>"UUID2", {uuid: <UUID>"UUID2", name: "Josie Hoseie"});
contacts.set(<UUID>"UUID3", {uuid: <UUID>"UUID3", name: "Eddy the Eagle", employer: "Enloe Magnet High School"});




export default contacts;