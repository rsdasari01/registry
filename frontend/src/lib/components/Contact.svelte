<style lang="scss">
    .contact {
        display: flex;
        flex-direction: row;
        // border: 1px dotted red;
        gap: .5rem;
        background: none;
        border: none;
        text-align: left;

        &:hover {
            background: darkblue;
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
    let {name} = $props();
</script>

<button class="contact">
    {#if true}
        <img src="https://picsum.photos/512/512" alt="Image of {name}" width=64 height=64>
    {/if}
    <div class="info">
        <h3>{name}</h3>

        <div class="tiny">
            <p>Brother</p>
            <p>IBM Corporation 2010 Best</p>
        </div>

    </div>
</button>