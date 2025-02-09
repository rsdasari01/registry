import type { Contact } from "$lib/contacts/Contact";
import contacts from "$lib/contacts/Contacts";

const ServerManager = {

    SERVER_ADDRESS: "https://gf43x3jj-5000.use2.devtunnels.ms/",
    AUTH_TOKEN: "",

    register: async (username : string, password : string) : Promise<boolean> => {
        const response = await fetch(`${ServerManager.SERVER_ADDRESS}/register`, {
            method: "POST",
            headers: new Headers({"content-type": "application/json"}),
            body: JSON.stringify({
                username, password
            })
        })

        return response.status == 201
    },

    login: async (username : string, password : string) : Promise<boolean> => {
        const response = await fetch(`${ServerManager.SERVER_ADDRESS}/login`, {
            method: "POST",
            headers: new Headers({"content-type": "application/json"}),
            body: JSON.stringify({
                username, password
            })
        });

        if (response.status !== 200) return false;

        ServerManager.AUTH_TOKEN = (await response.json()).access_token;

        // Update contacts after login
        ServerManager.getContacts().then(newContacts => {
            if (!newContacts) return;

            Object.values(newContacts).forEach(contact => {
                contacts.set(contact.uuid, contact);
            })
        })

        return true
    },


    getContacts: async () : Promise<Contact[]|null> => {
        if (!ServerManager.AUTH_TOKEN) return null;

        const response = await fetch(`${ServerManager.SERVER_ADDRESS}/contacts`, {
            method: "GET",
            headers: new Headers({
                "Authorization": `Bearer ${ServerManager.AUTH_TOKEN}`
            })
        })

        if (response.status !== 200) return null;

        return await response.json()
    },

    updateContact: async (contact : Contact) : Promise<boolean> => {
        if (!ServerManager.AUTH_TOKEN) return false;

        const response = await fetch(`${ServerManager.SERVER_ADDRESS}/contacts`, {
            method: "POST",
            headers: new Headers({
                "Authorization": `Bearer ${ServerManager.AUTH_TOKEN}`,
                "content-type": "application/json"
            }),
            body: JSON.stringify(contact)
        })

        return response.status === 201
    }


}

export default ServerManager;