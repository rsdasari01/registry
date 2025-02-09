
<!-- Stretch Goals here -->
<!-- Make dots drag/droppable -->
<!-- Highlight dots based on hover / select of contact -->
<!-- Select contact based on click of dot -->
<!-- Theme the dots to look like fantasy elements -->

<script lang="ts">
    import { onMount } from "svelte";

    let containerElem : HTMLDivElement;
    
    onMount(async () => {
        const Graph = await import ("$lib/graph/Graph");
        Graph.createGraph(containerElem);
    })

</script>


<style>
    #container {
        width: 100%;
        height: 100%;
        background: aquamarine;
    }
</style>

<div id="container" bind:this={containerElem}></div>