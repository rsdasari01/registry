<script lang="ts">
    import { goto } from "$app/navigation";
    import ServerManager from "$lib/remote/ServerManager";


    let username = ""
    let password = ""

</script>

<h1>Login to Account</h1>
<input type="text" name="username" id="username" bind:value={username}>
<input type="password" name="password" id="password" bind:value={password}>
<button onclick={async () => {
    if (await ServerManager.login(username, password)) {
        goto("/")
    }
}}>Login</button>
<button onclick={async () => {
    if (await ServerManager.register(username, password)) {
        window.alert("Account successfully registered!");
    } else {
        window.alert("You've done screwed up")
    }
}}>Register</button>
