<script lang="ts">
    import Contact from "$lib/components/Contact.svelte";

    let searchValue : String = "";




</script>

<style lang="scss">
    .scroll {
        position: fixed;
        height: 95%;
        top: 5%;
        left: 5%;
        width: 30%;
        height: 90%; 
        border: 3px solid black;
        background: #E0C9A6;
        max-width: 25rem;
        
        .contactList {
            height: 100%;
            padding-left: 1rem;
            overflow-y: scroll;
            overflow-x: hidden;
            list-style: none;
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
        
    }
</style>

<div class="container">

    <div class="scroll">
        <ul class="contactList">
            <Contact name="Joe" />
            <Contact name="Bob" />
            <!-- {#each {length: 50}} -->
            <!-- {/each} -->
        </ul>
    </div>
</div>

<input type="search" class="searchbox" name="searchBox" placeholder="Search for contacts..." bind:value={searchValue}>