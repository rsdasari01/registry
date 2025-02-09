<script lang="ts">
    import ContactPreview from "$lib/components/ContactPreview.svelte";
    import { fade } from "svelte/transition";
    import type { Contact } from "$lib/contacts/Contact";

    const {contacts, contactSelected} : {contacts : Iterable<Contact>, contactSelected : CallableFunction} = $props();
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
    {#each contacts as contact}
        <ContactPreview {contact} onclick={() => {contactSelected(contact)}} />
    {/each}
</ul>