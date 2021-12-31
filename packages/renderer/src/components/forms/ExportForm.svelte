<script lang="ts">
  import { DatePicker, DatePickerInput } from "carbon-components-svelte";
  import ipc from "/@/services/ipcService";
  import type id from "/type/util/Id";
  import type ExportParams from "/type/util/ExportParams";
  import { simplifyDate } from "/@/services/util";

  export let id: id;
  export let isUser: boolean;
  let fromDate: string;
  let toDate: string;

  export const submit = () => {
    console.log("");
    let exportParams: ExportParams = {
      fromDate: simplifyDate(fromDate),
      toDate: simplifyDate(toDate),
      id: id,
      isUser: isUser,
    };
    console.log("exportParams", exportParams);
    ipc.invoke("exportTable", exportParams);
  };

  export let isValid = false;
  function validate() {
    console.log("valid", isValid);
    isValid = fromDate.length > 0 && toDate.length > 0;
  }
  $: console.log(fromDate);
</script>

<div on:change={() => validate()} style="height:50vh">
  <DatePicker
    datePickerType="range"
    flatpickrProps={{ static: true }}
    dateFormat="d. m. Y"
    bind:valueFrom={fromDate}
    bind:valueTo={toDate}
  >
    <DatePickerInput labelText="From" placeholder="mm. dd. yyyy" />
    <DatePickerInput labelText="To" placeholder="mm. dd. yyyy" />
  </DatePicker>
</div>
