<script lang="ts">
    import ContactList from "$lib/components/ContactList.svelte";
    import ContactProfile from "$lib/components/ContactProfile.svelte";
    import contacts from "$lib/contacts/Contacts";
    import { createNewContact, type Contact } from "$lib/contacts/Contact";

    let viewingContact : Contact|null = $state(null);
    
    let searchValue : string = $state("");
    const filteredContacts = $derived.by(() => {
        const filterValue = searchValue.toLowerCase();
        viewingContact;
        return contacts.values().filter(contact => contact.name.toLowerCase().includes(filterValue));
    })

</script>

<style lang="scss">
    .scroll {
        position: fixed;
        display: flex;
        top: 5%;
        left: 5%;
        width: 30%;
        height: 90%;
        border: 3px solid black;
        background: #E0C9A6;
        max-width: 25rem;
        overflow-x: hidden;

        transition: width 500ms, max-width 500ms;

        &.wide {
            width: 50%;
            max-width: 60rem;
        }
    }

    .searchbox {
        position: fixed;
        width: 55%;
        height: 7%;
        padding: 1rem;
        top: 5%;
        right: 5%;
        border: 3px solid black;
        border-radius: .2rem;
        transition: width 500ms;

        &.thin {
            width: 35%;
        }
    }

    .add {
        background: purple;
        border-radius: 50%;
        position: fixed;
        bottom: 3rem;
        right: 3rem;
        width: 5rem;
        height: 5rem;
        color: white;
        font-weight: bold;
        border: none;
        font-size: 3rem;
        cursor: pointer;

        &:hover {
            background: #540054;
        }

        &:focus {
            background: #7a247a;
        }
    }

    .map {
        z-index: -1;
        background-color: turquoise;
        margin: 0;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: fixed;
    }
</style>

<div class="container">
    <div class="scroll {viewingContact ? 'wide' : ''}">
        {#if viewingContact}
            <ContactProfile contact={viewingContact} changeContact={(contact : Contact|null) => {viewingContact = contact}} />
        {:else}
            <ContactList contactSelected={(contact : Contact) => {viewingContact = contact}} contacts={filteredContacts} />
        {/if}
    </div>
</div>

<input type="search" oninput={() => {viewingContact = null}} class="searchbox {viewingContact ? 'thin' : ''}" name="searchBox" placeholder="Search for contacts..." bind:value={searchValue}>

<button class="add" onclick={() => {viewingContact = createNewContact()}}>🖋</button>

<div class="map" />