<script lang="ts">
    import ContactList from "$lib/components/ContactList.svelte";
    import ContactProfile from "$lib/components/ContactProfile.svelte";
    import type { Contact } from "$lib/contacts/Contact";

    let searchValue : String = "";
    let viewingContact : Contact|null = null;

    function showContact(contact : Contact) {
        console.log(`Showing contact ${contact}`)
        viewingContact = contact;
    }

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
</style>

<div class="container">

    <div class="scroll {viewingContact ? 'wide' : ''}">
        {#if viewingContact}
            <ContactProfile contact={viewingContact} />
        {:else}
            <ContactList contactSelected={showContact} />
        {/if}
    </div>
</div>

<input type="search" class="searchbox {viewingContact ? 'thin' : ''}" name="searchBox" placeholder="Search for contacts..." bind:value={searchValue}>