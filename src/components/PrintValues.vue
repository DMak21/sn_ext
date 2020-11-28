<template>
  <div>
    <!-- TABLE NAME INPUT -->
    <div class="flex justify-around mb-3 px-6">
      <div class="flex-shrink px-2 mt-2">
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
    <div class="flex justify-around">
      <div class="mt-1 w-1/3">
        <input
          id="sys_id"
          type="radio"
          class="form-radio h-4 w-4 mr-1 text-blue-600 transition duration-150 ease-in-out"
          @change="handleQuerySelection"
          :checked="queryFlag"
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
        />
        <p v-if="$v.sysId.$error" class="text-xs text-red-600">
          <i class="fa fa-exclamation"></i> sys_id is required
        </p>
      </div>
    </div>

    <!-- ENCODED_QUERY INPUT -->
    <div class="flex justify-around mb-4">
      <div class="mt-2 w-1/3">
        <input
          id="encoded_query"
          type="radio"
          class="form-radio h-4 w-4 mr-1 text-blue-600 transition duration-150 ease-in-out"
          @change="handleQuerySelection"
          :checked="!queryFlag"
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
        />
        <p v-if="$v.encodedQuery.$error" class="text-xs text-red-600">
          <i class="fa fa-exclamation"></i> encoded_query is required
        </p>
      </div>
    </div>

    <!-- VALUES TO BE UPDATED LABEL -->
    <div class="flex">
      <label class="block text-xs font-medium leading-5"
        >Keys for which values are to be printed:</label
      >
    </div>

    <!-- KEYS (- READONLY) -->
    <div
      class="flex items-start justify-center"
      v-for="(item, index) in keysToBePrinted"
      :key="index"
    >
      <div class="pr-2 w-2/3">
        <input
          class="form-input relative block w-full focus:z-10 text-xs"
          :value="item"
          readonly
        />
      </div>
      <div class="flex-shrink">
        <button class="focus:outline-none" @click="deleteValue(index)">
          <i class="fa fa-minus-circle text-red-600"></i>
        </button>
      </div>
    </div>

    <!-- KEYS (+) -->
    <div class="flex items-start justify-center">
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
      <div class="flex-shrink pt-2">
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
          v-model="doRun"
          @change="!doRun"
          :checked="doRun"
        />
        <label for="doRun" class="text-xs ml-2">Run</label>
      </div>
      <div class="w-1/2 mt-1">
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
const { required } = require("vuelidate/lib/validators");
export default {
  data() {
    return {
      table: "",
      sysId: "",
      encodedQuery: "",
      queryFlag: true,
      keysToBePrinted: [],
      key: "",
      newValueError: false,
      snTabError: false,
      script: "",
      doRun: true,
      doFocus: true,
      currentTabUrl: "",
    };
  },
  mounted() {
    this.$refs.tableInput.focus();
    this.$refs.encQueryInput.disabled = true;

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
  },
  methods: {
    handleQuerySelection() {
      this.queryFlag = !this.queryFlag;
      if (this.queryFlag) {
        this.encodedQuery = "";
        this.$refs.encQueryInput.disabled = true;
        this.$refs.sysQueryInput.disabled = false;
        this.$refs.sysQueryInput.focus();
        this.$v.encodedQuery.$reset();
      } else {
        this.sysId = "";
        this.$refs.sysQueryInput.disabled = true;
        this.$refs.encQueryInput.disabled = false;
        this.$refs.encQueryInput.focus();
        this.$v.sysId.$reset();
      }
    },
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
      this.script +=
        '  result += (gr.sys_id + " | " + gr.getDisplayValue() + "\\\\n");\\n';
      this.keysToBePrinted.forEach((key) => {
        this.script +=
          '  result += ("' + key + ' => " + gr.' + key + ' + "\\\\n");\\n';
      });
      this.script += '  result += ("\\\\n");\\n';

      this.script += "}\\n";
      this.script += "gs.print(result);\\n";
    },
    updateRecords() {
      let valError = false;

      this.$v.table.$touch();
      this.newValueError = this.key || this.value;
      if (this.$v.table.$invalid || this.newValueError) valError = true;

      if (this.keysToBePrinted.length === 0) {
        this.$v.key.$touch();
        if (this.$v.key.$invalid) valError = true;
      }

      if (this.queryFlag) {
        this.$v.sysId.$touch();
        if (this.$v.sysId.$invalid) valError = true;
        this.sysId = this.sysId.trim();
      } else {
        this.$v.encodedQuery.$touch();
        if (this.$v.encodedQuery.$invalid) valError = true;
      }

      if (valError) return;

      if (this.snTabError) {
        return;
      }

      this.createScript();
      const script = this.script;
      const doRun = this.doRun;
      const doFocus = this.doFocus;
      const currentTabUrl = this.currentTabUrl;

      chrome.runtime.getBackgroundPage(function(backgroundPage) {
        backgroundPage.updateRecords(
          currentTabUrl.origin + "/sys.scripts.do",
          script,
          doRun,
          doFocus
        );
      });
    },
  },
  validations: {
    key: {
      required,
    },
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
