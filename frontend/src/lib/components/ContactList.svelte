<script lang="ts">
    import ContactPreview from "$lib/components/ContactPreview.svelte";
    import contacts from "$lib/contacts/Contacts";
    import { fade } from "svelte/transition";

    const {contactSelected} : {contactSelected : CallableFunction} = $props();
</script>

<style>
    .contactList {
        height: 100%;
        width: 100%;
        padding: 0;
        list-style: none;
    }
</style>

<ul class="contactList" transition:fade>
    {#each contacts.values() as contact}
        <ContactPreview {contact} onclick={() => {contactSelected(contact)}} />
    {/each}
</ul>