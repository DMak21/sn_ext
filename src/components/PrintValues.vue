<template>
  <div>
    <!-- VALUES TO BE UPDATED LABEL -->
    <div class="flex flex-row justify-between mb-1">
      <label class="block text-xs font-medium leading-5"
        >Values to be printed for keys:</label
      >
      <button
        type="button"
        v-show="keysToBePrinted.length != 0"
        class="inline-flex items-center px-1 mr-2 border border-transparent text-xs font-light rounded-full text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        @click="clearKeys"
      >
        Clear All
      </button>
      <button
        type="button"
        v-show="showClearKeysFromStorage && keysToBePrinted.length == 0"
        class="inline-flex items-center px-1 mr-2 border border-transparent text-xs font-light rounded-full text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        @click="clearKeysFromStorage"
      >
        Clear from Storage
      </button>
    </div>

    <!-- KEYS (- READONLY) -->
    <div
      class="flex items-start justify-center mb-1"
      v-for="(item, index) in keysToBePrinted"
      :key="index"
    >
      <div class="pr-2 w-2/3">
        <input
          class="form-input relative block w-full focus:z-10 text-xs"
          v-model="keysToBePrinted[index]"
        />
      </div>
      <div class="flex-shrink self-center">
        <button class="focus:outline-none" @click="deleteValue(index)">
          <i class="fa fa-minus-circle text-red-600"></i>
        </button>
      </div>
    </div>

    <!-- KEYS (+) -->
    <div class="flex items-start justify-center mb-1">
      <div class="pr-2 w-2/3">
        <input
          class="form-input relative block w-full focus:z-10 text-xs"
          :class="{
            'border-red-300 focus:border-red-300 focus:shadow-outline-red':
              $v.key.$error,
          }"
          placeholder="key"
          v-model="key"
        />
        <p v-if="$v.key.$error" class="text-xs text-red-600">
          <i class="fa fa-exclamation"></i> Key is required
        </p>
      </div>
      <div class="flex-shrink self-center">
        <button class="focus:outline-none" @click="addValue">
          <i class="fa fa-plus-circle text-blue-600"></i>
        </button>
      </div>
    </div>
    <p v-if="newValueError" class="text-xs text-red-600">
      <i class="fa fa-exclamation"></i> Please add or empty out final key value
      pair
    </p>

    <!-- WORKFLOW CHECKBOX -->
    <div class="flex items-center content-start flex-wrap my-2">
      <div class="w-1/2 mt-1">
        <input
          id="doRun"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          v-model="pRun"
          @change="!pRun"
          :checked="pRun"
        />
        <label for="doRun" class="text-xs ml-2">Run</label>
      </div>
      <div class="w-1/2 mt-1">
        <input
          id="doFocus"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          v-model="pFocus"
          @change="!pFocus"
          :checked="pFocus"
        />
        <label for="doFocus" class="text-xs ml-2">Focus</label>
      </div>
    </div>

    <!-- INFO MESSAGES -->
    <div class="flex flex-col items-start my-1 px-2">
      <p v-if="snTabError" class="text-xs text-red-600">
        <i class="fa fa-exclamation"></i> Kindly run the extension in a
        ServiceNow Instance
      </p>
      <p class="text-xs text-grey-600">
        <i class="fa fa-info"></i> Make encoded query as * if referring to all
        records
      </p>
    </div>

    <!-- UPDATE RECORDS BUTTON -->
    <div class="flex justify-end mb-2">
      <span class="ml-3 inline-flex">
        <button
          type="submit"
          class="inline-flex justify-center my-2 mx-4 text-xs leading-5 font-medium text-grey-600 border-none hover:text-blue-600 focus:outline-none"
          @click="saveButton"
        >
          Save
        </button>
      </span>
      <span class="ml-3 inline-flex rounded-md shadow-sm">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent text-xs leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
          @click="updateRecords"
        >
          Print Values
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

const { required } = require("vuelidate/lib/validators");

export default {
  data() {
    return {
      key: "",
      newValueError: false,
      script: "",
      showClearKeysFromStorage: false,
    };
  },
  computed: {
    ...mapFields([
      "scope",
      "pRun",
      "pFocus",
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
  mounted() {
    this.$parent.$refs.tableInput.focus();
    this.$parent.$v.table.$reset();
    this.$parent.$v.sysId.$reset();
    this.$parent.$v.encodedQuery.$reset();
  },
  methods: {
    addValue() {
      this.$v.key.$touch();
      if (!this.$v.key.$invalid) {
        this.key = this.key.trim();
        this.keysToBePrinted.push(this.key);
        (this.key = ""), this.$v.key.$reset();
        this.newValueError = false;
      }
    },
    deleteValue(index) {
      this.keysToBePrinted.splice(index, 1);
    },
    createScript() {
      this.script = 'var result = "\\\\n";\\n';
      this.script += 'result += ("';
      this.script += this.keysToBePrinted.join(",");
      this.script += '\\\\n");\\n';
      this.script += 'var gr = new GlideRecord("' + this.table + '");\\n';
      if (this.queryFlag) {
        this.script += 'gr.addQuery("sys_id", "' + this.sysId + '");\\n';
        this.script += "gr.query();\\n";
        this.script += "if";
      } else if (this.encodedQuery == "*") {
        this.script += "gr.query();\\n";
        this.script += "while";
      } else {
        this.script += 'gr.addEncodedQuery("' + this.encodedQuery + '");\\n';
        this.script += "gr.query();\\n";
        this.script += "while";
      }
      this.script += "(gr.next()){\\n";
      this.script += "  result += (";
      this.script += this.keysToBePrinted
        .map((key) => "gr." + key)
        .join(' + "," + ');
      this.script += ' + "\\\\n");\\n';
      this.script += "}\\n";
      this.script += "gs.print(result);\\n";
    },
    clearKeys() {
      this.keysToBePrinted = [];
      this.key = "";

      chrome.storage.local.get(null, (items) => {
        if (this.table in items) {
          const tableValues = JSON.parse(items[this.table]);
          if (tableValues.p.length > 0) this.showClearKeysFromStorage = true;
        }
      });
    },
    clearKeysFromStorage() {
      chrome.storage.local.set({
        [this.table]: JSON.stringify({ u: this.valuesToBeUpdated, p: [] }),
      });
      this.showClearKeysFromStorage = false;
    },
    saveButton() {
      chrome.storage.local.set({
        [this.table]: JSON.stringify({
          u: this.valuesToBeUpdated,
          p: this.keysToBePrinted,
        }),
      });
    },
    updateRecords() {
      let valError = false;

      this.$parent.$v.table.$touch();
      this.newValueError = this.key || this.value;
      if (this.$parent.$v.table.$invalid || this.newValueError) valError = true;

      if (this.keysToBePrinted.length === 0) {
        this.$v.key.$touch();
        if (this.$v.key.$invalid) valError = true;
      }

      if (this.queryFlag) {
        this.$parent.$v.sysId.$touch();
        if (this.$parent.$v.sysId.$invalid) valError = true;
        this.sysId = this.sysId.trim();
      } else {
        this.$parent.$v.encodedQuery.$touch();
        if (this.$parent.$v.encodedQuery.$invalid) valError = true;
      }

      if (valError) return;

      if (this.snTabError) {
        return;
      }

      this.createScript();
      const script = this.script;
      const doRun = this.pRun;
      const doFocus = this.pFocus;
      const currentTabUrl = this.currentTabUrl;
      const scope = this.scope;

      chrome.storage.local.set({
        [this.table]: JSON.stringify({
          u: this.valuesToBeUpdated,
          p: this.keysToBePrinted,
        }),
      });

      chrome.runtime.getBackgroundPage(function(backgroundPage) {
        backgroundPage.updateRecords(
          currentTabUrl.origin + "/sys.scripts.do",
          script,
          doRun,
          doFocus,
          scope
        );
      });
    },
  },
  validations: {
    key: {
      required,
    },
  },
};
</script>
