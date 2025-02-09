import { SvelteMap } from "svelte/reactivity" 
import type { UUID } from "./Contact"
import type { Contact } from "$lib/contacts/Contact"
import {v4 as uuidv4} from "uuid"

const contacts = new SvelteMap<UUID, Contact>();

const ids = [<UUID>uuidv4(), <UUID>uuidv4(), <UUID>uuidv4(), <UUID>uuidv4()]


contacts.set(ids[0], {uuid: ids[0], name: "Bob Dobbington", picture: "https://picsum.photos/512/512", relations: [], relation: "Father", employer: "IBM"});
contacts.set(ids[1], {uuid: ids[1], name: "Josie Hoseie", picture: "https://s2.qwant.com/thumbr/474x484/7/d/ade1a0975cdfe61012110573c70a0fad98bbd8a5aba3ace6ca93ae12495841/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.FEHhaAeEhy7-BFaXO-if5QHaHk%26pid%3DApi&q=0&b=1&p=0&a=0", relations: [ids[2]]});
contacts.set(ids[2], {uuid: ids[2], name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School", relations: [ids[0]]});
contacts.set(ids[3], {uuid: ids[3], name: "Eddie the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School", relations: []});
export default contacts;