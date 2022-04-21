<script lang="ts">
  import type NotificationData from "../../../../types/util/NotificationData";
  import { InlineNotification } from "carbon-components-svelte";

  window["electron"].onNotify((notification: NotificationData) => {
    console.log("received", notification);
    handleNotification(notification);
  });
  let showNotification = false;
  let kind: "error" | "info" | "success";
  let kinds = ["error", "info", "success"];
  async function handleNotification(notification: NotificationData) {
    kind = kinds[notification.type] as any;
    globNotification = notification;
    showNotification = true;
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    showNotification = false;
  }
  let globNotification: NotificationData;
</script>

{#if showNotification}
  <InlineNotification
    title={`${kind[0].toUpperCase()}${kind.slice(1)}:`}
    subtitle={globNotification.text}
    {kind}
    timeout={5000}
    on:close={() => {
      showNotification = false;
    }}
    lowContrast
    style="position:fixed;bottom:10%;left:50%;transform:translateX(-50%)"
  />
{/if}
