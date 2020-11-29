<template>
  <div>
    <h1 class="text-base mb-1">Set Default Values</h1>
    <h2 class="text-sm mt-1">Print Value</h2>
    <div class="flex flex-col content-start mb-2">
      <div class="mt-1">
        <input
          id="doRun"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          v-model="doRun"
          @change="!doRun"
          :checked="doRun"
        />
        <label for="doRun" class="text-xs ml-2">Run</label>
      </div>
      <div class="mt-1">
        <input
          id="doFocus"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          v-model="doFocus"
          @change="!doFocus"
          :checked="doFocus"
        />
        <label for="doFocus" class="text-xs ml-2">Focus</label>
      </div>
    </div>
    <h2 class="text-sm mt-1">Update Records</h2>
    <div class="flex flex-col content-start mb-2">
      <div class="mt-1">
        <input
          id="workflow"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          v-model="workflowFalse"
          @change="!workflowFalse"
          :checked="workflowFalse"
        />
        <label for="workflow" class="text-xs ml-2">Workflow - False</label>
      </div>
      <div class="mt-1">
        <input
          id="doRun"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          v-model="doRun"
          @change="!doRun"
          :checked="doRun"
        />
        <label for="doRun" class="text-xs ml-2">Run</label>
      </div>
      <div class="mt-1">
        <input
          id="doFocus"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          v-model="doFocus"
          @change="!doFocus"
          :checked="doFocus"
        />
        <label for="doFocus" class="text-xs ml-2">Focus</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
