<style lang="scss">
    .contact {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        padding: .5rem 0 .5rem 1rem;
        font-family: 'Bagnard';

        &:hover {
            background: #C7B291;
        }

        cursor: pointer;

        .info {
            flex-direction: column;
            justify-content: space-around;
            text-wrap: nowrap;
            display: flex;

            h3 {
                font-size: 1.5rem;
                margin: 0;
            }

            .tiny {
                display: flex;
                flex-direction: row;
                font-size: .75rem;
                overflow-x: hidden;
                gap: 1rem;
                color: grey;
            }

        }

    }
</style>


<script lang="ts">
    import type { Contact } from "$lib/contacts/Contact";

    let { contact } : {contact : Contact} = $props();
</script>

<button class="contact">
    {#if true}
        <img src="https://picsum.photos/512/512" alt="Image of {contact.name}" width=64 height=64>
    {/if}
    <div class="info">
        <h3>{contact.name}</h3>

        <div class="tiny">
            <p>{contact.relation}</p>
            <p>{contact.employer}</p>
        </div>

    </div>
</button>