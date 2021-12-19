<script lang="ts">
  import router from "page";
  function handleclick() {
    router("/entries");
    console.log("test");
  }
</script>

<h1>Settings</h1>
<p on:click={handleclick}>test</p>
