import { SvelteMap } from "svelte/reactivity" 
import type { UUID } from "./Contact"
import type { Contact } from "$lib/contacts/Contact"
import ServerManager from "$lib/remote/ServerManager";

const contacts = new SvelteMap<UUID, Contact>();

ServerManager.getContacts().then(newContacts => {
    newContacts?.forEach(contact => {
        contacts.set(contact.uuid, contact);
    })
})

export default contacts;