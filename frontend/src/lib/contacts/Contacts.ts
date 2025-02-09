import { SvelteMap } from "svelte/reactivity" 
import type { UUID } from "./Contact"
import type { Contact } from "$lib/contacts/Contact"

const contacts = new SvelteMap<UUID, Contact>();

contacts.set(<UUID>"UUID", {uuid: <UUID>"UUID", name: "Bob Dobbington", picture: "https://picsum.photos/512/512", relation: "Father", employer: "IBM"});
contacts.set(<UUID>"UUID2", {uuid: <UUID>"UUID2", name: "Josie Hoseie", picture: "https://s2.qwant.com/thumbr/474x484/7/d/ade1a0975cdfe61012110573c70a0fad98bbd8a5aba3ace6ca93ae12495841/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.FEHhaAeEhy7-BFaXO-if5QHaHk%26pid%3DApi&q=0&b=1&p=0&a=0", });
contacts.set(<UUID>"UUID3", {uuid: <UUID>"UUID3", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID4", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID5", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID6", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID7", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID8", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID9", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID10", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID11", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID12", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID13", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID14", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID15", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID16", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID17", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID18", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID19", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID20", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID21", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID22", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID23", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});
contacts.set(<UUID>"UUID24", {uuid: <UUID>"UUID", name: "Eddy the Eagle", picture: "https://picsum.photos/512/512", employer: "Enloe Magnet High School"});




export default contacts;