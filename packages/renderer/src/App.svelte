<script lang="ts">
  import "./tailwind.css";
  import router from "page";
  import Router from "/@/components/Router.svelte";

  router.start();
</script>

<main class="bg-background h-screen">
  <nav>
    <a href="/">home</a>
    <a href="/users">about</a>
    <a href="/user/1">profile</a>
  </nav>
  <Router />
</main>
