import type { SvelteComponent } from "svelte";

type OpenModal= (
  header: string,
  formComponent: typeof SvelteComponent,
  properties: any,
  onClose: (e: CustomEvent<any>) => void
) => void;
export default OpenModal;
