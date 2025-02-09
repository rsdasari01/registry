import { SvelteMap } from "svelte/reactivity" 
import type { UUID } from "./Contact"
import type { Contact } from "$lib/contacts/Contact"

const contacts = new SvelteMap<UUID, Contact>();

contacts.set(<UUID>"UUID", {uuid: <UUID>"UUID", name: "Bob Dobbington", picture: "https://picsum.photos/512/512", relations: [], relation: "Father", employer: "IBM"});
contacts.set(<UUID>"UUID2", {uuid: <UUID>"UUID2", name: "Josie Hoseie", picture: "https://s2.qwant.com/thumbr/474x484/7/d/ade1a0975cdfe61012110573c70a0fad98bbd8a5aba3ace6ca93ae12495841/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.FEHhaAeEhy7-BFaXO-if5QHaHk%26pid%3DApi&q=0&b=1&p=0&a=0", relations: ["UUID3" as UUID]});
contacts.set(<UUID>"UUID3", {uuid: <UUID>"UUID3", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School", relations: ["UUID" as UUID]});
contacts.set(<UUID>"UUID4", {uuid: <UUID>"UUID4", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School", relations: []});
export default contacts;