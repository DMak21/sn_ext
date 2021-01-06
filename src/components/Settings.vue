<template>
  <div>
    <h1 class="text-base mb-1">Set Default Values</h1>
    <div class="flex flex-row wrap">
      <div class="flex-grow rounded border m-2 py-1 px-2 bg-green-100">
        <h2 class="text-sm">Print Value</h2>
        <div class="flex flex-col content-start my-2">
          <div class="mt-1">
            <input
              id="pRun"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              v-model="pRun"
            />
            <label for="pRun" class="text-xs ml-2">Run</label>
          </div>
          <div class="mt-1">
            <input
              id="pFocus"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              v-model="pFocus"
            />
            <label for="pFocus" class="text-xs ml-2">Focus</label>
          </div>
        </div>
      </div>
      <div class="flex-grow rounded border m-2 py-1 px-2 bg-red-100">
        <h2 class="text-sm">Update Records</h2>
        <div class="flex flex-col content-start my-2">
          <div class="mt-1">
            <input
              id="workflow"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              v-model="uWorkflowFalse"
            />
            <label for="workflow" class="text-xs ml-2">Workflow - False</label>
          </div>
          <div class="mt-1">
            <input
              id="uRun"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              v-model="uRun"
            />
            <label for="uRun" class="text-xs ml-2">Run</label>
          </div>
          <div class="mt-1">
            <input
              id="uFocus"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              v-model="uFocus"
            />
            <label for="uFocus" class="text-xs ml-2">Focus</label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 rounded border m-2 p-2 bg-blue-100">
      <h2 class="text-sm">Scope</h2>
      <input
        class="my-2 form-input relative block w-full focus:z-10 text-xs"
        placeholder="scope"
        ref="scopeInput"
        v-model="scope"
      />
    </div>

    <h1 class="text-base my-2">Experimental Features</h1>
    <div class="mt-1">
      <input
        id="exp1"
        type="checkbox"
        class="form-checkbox text-blue-600 transition duration-150 ease-in-out"
        v-model="exp1"
      />
      <label for="exp1" class="text-sm ml-2">Toggle Field Name/Label</label>
    </div>

    <div class="flex justify-end mb-2">
      <span class="ml-3 inline-flex rounded-md shadow-sm">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent text-xs leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
          @click="onSave"
        >
          Save
        </button>
      </span>
    </div>
  </div>
</template>
<script>
import store from "../store.js";

export default {
  data() {
    return {
      scope: "",
      pRun: false,
      pFocus: false,
      uWorkflowFalse: false,
      uRun: false,
      uFocus: false,
      exp1: false,
    };
  },
  created() {
    chrome.storage.local.get({ settings: "{}" }, (items) => {
      const settings = JSON.parse(items["settings"]);

      Object.keys(settings).forEach((key) => {
        this.$data[key] = settings[key];
      });
    });
  },
  methods: {
    onSave() {
      chrome.storage.local.set({ settings: JSON.stringify(this.$data) });
      store.commit("setSettings", this.$data);
    },
  },
};
</script>
