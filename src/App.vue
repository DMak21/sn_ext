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
              <a
                href="#"
                class="flex-shrink py-2 px-2 text-center border-b-2 font-medium text-sm leading-5"
                :class="getClassForTab('settings')"
                @click="tabChange('settings')"
                ><i class="fa fa-cog"></i
              ></a>
            </nav>
          </div>

          <div v-if="tab != 'settings'">
            <!-- TABLE NAME INPUT -->
            <div class="flex justify-around mb-3 px-6">
              <div class="flex-shrink px-2 self-center">
                <label class="block text-xs font-medium uppercase">Table</label>
              </div>
              <div class="flex-1 px-2">
                <input
                  class="form-input relative block w-full focus:z-10 text-xs"
                  placeholder="table_name"
                  v-model="table"
                  :class="{
                    'border-red-300 focus:border-red-300 focus:shadow-outline-red':
                      $v.table.$error,
                  }"
                  ref="tableInput"
                />
                <p v-if="$v.table.$error" class="text-xs text-red-600">
                  <i class="fa fa-exclamation"></i> Table name is required
                </p>
              </div>
            </div>

            <!-- SYS_ID INPUT -->
            <div class="flex justify-around mb-1">
              <div class="w-1/3 self-center">
                <input
                  id="sys_id"
                  type="radio"
                  class="form-radio h-4 w-4 mr-1 text-blue-600 transition duration-150 ease-in-out"
                  v-model="queryFlag"
                  @change="handleQuerySelection"
                  :value="true"
                />
                <label for="sys_id">
                  <span class="leading-5 text-xs">sys_id</span>
                </label>
              </div>
              <div class="w-2/3 pr-2">
                <input
                  class="form-input relative block w-full focus:z-10 text-xs"
                  placeholder="sys_id"
                  ref="sysQueryInput"
                  v-model="sysId"
                  :class="{
                    'border-red-300 focus:border-red-300 focus:shadow-outline-red':
                      $v.sysId.$error,
                  }"
                  @focus="handleQuerySelection(true)"
                />
                <p v-if="$v.sysId.$error" class="text-xs text-red-600">
                  <i class="fa fa-exclamation"></i> sys_id is required
                </p>
              </div>
            </div>

            <!-- ENCODED_QUERY INPUT -->
            <div class="flex justify-around mb-4">
              <div class="w-1/3 self-center">
                <input
                  id="encoded_query"
                  type="radio"
                  class="form-radio h-4 w-4 mr-1 text-blue-600 transition duration-150 ease-in-out"
                  v-model="queryFlag"
                  @change="handleQuerySelection"
                  :value="false"
                />
                <label for="encoded_query">
                  <span class="leading-5 text-xs">encoded_query</span>
                </label>
              </div>
              <div class="w-2/3 pr-2">
                <input
                  class="form-input relative block w-full focus:z-10 text-xs"
                  placeholder="encoded_query"
                  ref="encQueryInput"
                  v-model="encodedQuery"
                  :class="{
                    'border-red-300 focus:border-red-300 focus:shadow-outline-red':
                      $v.encodedQuery.$error,
                  }"
                  @focus="handleQuerySelection(false)"
                />
                <p v-if="$v.encodedQuery.$error" class="text-xs text-red-600">
                  <i class="fa fa-exclamation"></i> encoded_query is required
                </p>
              </div>
            </div>
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
const { required } = require("vuelidate/lib/validators");
import { mapFields } from "vuex-map-fields";

import UpdateRecords from "./components/UpdateRecords.vue";
import PrintValues from "./components/PrintValues.vue";
import Settings from "./components/Settings.vue";
import store from "./store.js";

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
  computed: {
    ...mapFields([
      "table",
      "sysId",
      "encodedQuery",
      "queryFlag",
      "currentTabUrl",
      "snTabError",
      "valuesToBeUpdated",
      "keysToBePrinted",
    ]),
  },
  created() {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      this.currentTabUrl = new URL(tabs[0].url);
      if (
        this.currentTabUrl.hostname.split(".").slice(-2, -1)[0] ===
        "service-now"
      ) {
        if (
          this.currentTabUrl.pathname === "/nav_to.do" &&
          this.currentTabUrl.searchParams.has("uri")
        ) {
          this.currentTabUrl = new URL(
            "https://" +
              this.currentTabUrl.hostname +
              decodeURI(this.currentTabUrl.searchParams.get("uri"))
          );
        }
        if (this.currentTabUrl.searchParams.has("sys_id")) {
          this.sysId = this.currentTabUrl.searchParams.get("sys_id");
          this.table = this.currentTabUrl.pathname
            .split("/")[1]
            .replace(".do", "");
        } else if (this.currentTabUrl.searchParams.has("sysparm_query")) {
          this.queryFlag = false;
          this.encodedQuery = decodeURI(
            this.currentTabUrl.searchParams.get("sysparm_query")
          );
          this.table = this.currentTabUrl.pathname
            .split("/")[1]
            .replace("_list.do", "");
        }
      } else {
        this.snTabError = true;
      }
    });

    chrome.storage.local.get(null, (items) => {
      if ("settings" in items) {
        const settings = JSON.parse(items["settings"]);
        store.commit("setSettings", settings);
      }

      if (!this.snTabError && this.table in items) {
        const tableValues = JSON.parse(items[this.table]);
        this.valuesToBeUpdated = tableValues.u;
        this.keysToBePrinted = tableValues.p;
      }

      if ("lastTab" in items) {
        this.tab = items["lastTab"];
      }
    });
  },

  methods: {
    tabChange: function(tab) {
      this.tab = tab;
      chrome.storage.local.set({ lastTab: tab });
    },
    getClassForTab: function(tab) {
      return {
        "border-blue-500 text-blue-600 focus:outline-none focus:text-blue-800 focus:border-blue-700":
          tab == this.tab,
        "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300":
          tab != this.tab,
      };
    },
    handleQuerySelection(param) {
      if (typeof param == "boolean") this.queryFlag = param;
      if (this.queryFlag) {
        this.$refs.sysQueryInput.focus();
        this.$v.encodedQuery.$reset();
      } else {
        this.$refs.encQueryInput.focus();
        this.$v.sysId.$reset();
      }
    },
  },
  validations: {
    table: {
      required,
    },
    sysId: {
      required,
    },
    encodedQuery: {
      required,
    },
  },
};
</script>
