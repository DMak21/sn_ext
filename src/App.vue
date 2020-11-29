<template>
  <div id="app">
    <div
      class="absolute left-1/2 transform -translate-x-1/2 w-screen max-w-md h-full"
    >
      <div id="card" class="rounded-md shadow-lg overflow-hidden h-full">
        <div class="relative grid gap-1 px-4 py-2">
          <!-- TAB - NAVIGATION -->
          <div class="border-b border-gray-200 mb-2">
            <nav class="flex">
              <a
                href="#"
                class="flex-1 py-2 px-1 text-center border-b-2 font-medium text-sm leading-5"
                :class="getClassForTab('print-values')"
                @click="tabChange('print-values')"
                >Print Values</a
              >
              <a
                href="#"
                class="flex-1 py-2 px-1 text-center border-b-2 font-medium text-sm leading-5"
                :class="getClassForTab('update-records')"
                @click="tabChange('update-records')"
                >Update Records</a
              >
              <!-- <a
                href="#"
                class="flex-shrink py-2 px-2 text-center border-b-2 font-medium text-sm leading-5"
                :class="getClassForTab('settings')"
                @click="tabChange('settings')"
                ><i class="fa fa-cog"></i
              ></a> -->
            </nav>
          </div>

          <update-records v-if="tab == 'update-records'"></update-records>
          <print-values v-if="tab == 'print-values'"></print-values>
          <settings v-if="tab == 'settings'"></settings>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateRecords from "./components/UpdateRecords.vue";
import PrintValues from "./components/PrintValues.vue";
import Settings from "./components/Settings.vue";

export default {
  name: "App",
  components: {
    "update-records": UpdateRecords,
    "print-values": PrintValues,
    settings: Settings,
  },
  data() {
    return {
      tab: "update-records",
    };
  },
  methods: {
    tabChange(tab) {
      this.tab = tab;
    },
    getClassForTab(tab) {
      return {
        "border-blue-500 text-blue-600 focus:outline-none focus:text-blue-800 focus:border-blue-700":
          tab == this.tab,
        "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300":
          tab != this.tab,
      };
    },
  },
};
</script>
