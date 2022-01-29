<script lang="ts">
  import Autocomplete from "../components/Autocomplete.svelte";
  import BaseForm from "../components/forms/BaseForm.svelte";
  import SettingsForm from "../components/forms/SettingsForm.svelte";
</script>

<h1>Settings</h1>

<BaseForm form={SettingsForm} props={{}} isModal={false} />
