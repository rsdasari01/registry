<script lang="ts">
    import type { Contact } from "$lib/contacts/Contact";
    import { fade, slide } from "svelte/transition";

    const {contact} : {contact : Contact} = $props();

    let editable = $state(false);

    function changeProfilePicture() {

    }

</script>

<style lang="scss">
    .profile {
        margin: 1rem;

        .overview {
            display: grid;
            grid-template-columns: 1fr 6fr;
            gap: 2rem;
            align-items: center;

            span {
                display: flex;
                flex-direction: row;
                gap: 2rem;
            }
        }
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

    <button class="edit" onclick={() => {editable = !editable}}>Edit</button>
</div>