<script lang="ts">
    import { createNewContact, type Contact, type UUID } from "$lib/contacts/Contact";
    import contacts from "$lib/contacts/Contacts";
    import { fade } from "svelte/transition";
    import ContactPreview from "./ContactPreview.svelte";
    import { onMount } from "svelte";
    import ServerManager from "$lib/remote/ServerManager";

    const {contact, changeContact, Graph} : {contact : Contact, changeContact : CallableFunction, Graph? : typeof import("$lib/graph/Graph")} = $props();

    let editable = $state(contact.name == "");

    let addRelationUUID : UUID|null = null;

    $effect(() => {
        if (!editable) {
            // Save changes to contact
            contacts.set(contact.uuid, contact);
            ServerManager.updateContact(contact);
            Graph?.updateContact(contact);
        }
    })

    function changeProfilePicture() {

    }

    function removeRelation(uuid : UUID) {
        contact.relations.splice(contact.relations.indexOf(uuid), 1);
        Graph?.removeConnection(contact.uuid, uuid);
    }



</script>

<style lang="scss">
    .profile {
        margin: 1rem;

        .overview {
            display: grid;
            grid-template-columns: 1fr 6fr 1fr;
            gap: 2rem;
            align-items: center;

            span {
                display: flex;
                flex-direction: row;
                gap: 2rem;
            }
        }
    }

    .close {
        // margin-bottom: 3rem;
    }

    button {
        background: none;
        border: none;
        padding: none;
    }

    .edit {
        background: pink;
        padding: 1rem;
        cursor: pointer;
        bottom: 3rem;
    }

    .relations {
        .relation {
            display: grid;
            grid-template-columns: 1fr;

            &.removable {
                grid-template-columns: 2fr 1fr;
            }
        }
    }

    .closeButton {
        font-size: 2rem;
        cursor: pointer;

        &:hover {
            background: #C7B291;
        }
    }
</style>

<div class="profile" transition:fade>
    <div class="overview">
        <button>
            <img src={contact.picture} alt="Picture of {contact.name}" width=128 height=128>
        </button>
        <div>
            {#if editable} <!-- Name -->
                <input type="text" name="Name" id="name" placeholder="Name" bind:value={contact.name}>
            {:else}
                <h1>{contact.name}</h1>
            {/if}
            
            <span> <!-- Age and Pronouns-->
                {#if editable}
                    <p>Age: <input type="number" name="Age" id="age" placeholder="Age" bind:value={contact.age}></p>
                    <p>Pronouns: <input type="text" name="Pronouns" id="pronouns" placeholder="They/Them" bind:value={contact.pronouns}></p>
                {:else}
                    {#if contact.age}<p>Age {contact.age}</p>{/if}
                    {#if contact.pronouns}<p>{contact.pronouns}</p>{/if}
                {/if}
            </span>
        </div>
        <button class="close closeButton" tabindex="1" onclick={() => {editable = false; changeContact(null)}}>✖</button>
    </div>

    {#if editable}
        <p>Email: <input type="text" name="Email" id="email" placeholder="email@example.com" bind:value={contact.email}></p>
        <p>Phone Number: <input type="text" name="Phone" id="phone" placeholder="+1 (123) 456-7890" bind:value={contact.phone}></p>
        <p>Address: <input type="text" name="Address" id="address" placeholder="Address" bind:value={contact.address}></p>
    {:else}
        {#if contact.email}<p>Email: <a href="mailto:{contact.email}">{contact.email}</a></p>{/if}
        {#if contact.phone}<p>Phone Number: <a href="tel:{contact.phone}">{contact.phone}</a></p>{/if}
        {#if contact.address}<p>Address: {contact.address}</p>{/if}
    {/if}

    <div class="relations">

        <h2>Relations</h2>
        {#each contact.relations as relation}
            <div class="relation {editable ? 'removable' : ''}">
                <ContactPreview contact={contacts.get(relation) ?? createNewContact()} onclick={() => {changeContact(contacts.get(relation))}} />
                {#if editable}<button class="remove closeButton" onclick={() => {removeRelation(relation)}}>✖</button>{/if}
            </div>
        {/each}
        {#if editable}
            <div>
                <select name="addRelation" bind:value={addRelationUUID}>
                    {#each contacts.values().filter((otherContact : Contact) => otherContact !== contact && !contact.relations.includes(otherContact.uuid)) as otherContact}
                        <option value={otherContact.uuid}>{otherContact.name}</option>
                    {/each}
                </select>
                <button onclick={() => {if (!addRelationUUID) return; contact.relations.push(addRelationUUID); addRelationUUID = null}}>Add</button>
            </div>
        {/if}

    </div>


    <button class="edit" onclick={() => {editable = !editable; }}>Edit</button>
</div>