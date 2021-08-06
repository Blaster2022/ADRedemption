"use strict";

Vue.component("modal-automator-script-import", {
  data() {
    return {
      input: "",
      rawDecoded: "",
      isValid: false,
      scriptName: "",
      lineCount: 0,
      scriptContent: "",
      hasErrors: false,
    };
  },
  mounted() {
    this.$refs.input.select();
  },
  methods: {
    update() {
      try {
        this.rawDecoded = atob(this.input);
      } catch (e) {
        // Improperly encoded saves will cause atob() to throw an exception
        this.isValid = false;
      }
      this.decodeSave();
    },
    decodeSave() {
      const parts = this.rawDecoded.split("||");
      if (parts.length !== 3 || parts[1].length !== parseInt(parts[0], 10)) {
        this.isValid = false;
        return;
      }
      this.scriptName = parts[1];
      this.scriptContent = parts[2];
      this.updateScriptInfo();
      this.isValid = true;
    },
    updateScriptInfo() {
      this.lineCount = this.scriptContent.split("\n").length;
      this.hasErrors = AutomatorGrammar.compile(this.scriptContent).errors.length !== 0;
    },
    importSave() {
      if (!this.isValid) return;
      AutomatorData.createNewScript(this.scriptContent, this.scriptName);
      AutomatorBackend.initializeFromSave();
      this.emitClose();
    },
  },
  template: `
    <div class="c-modal-import l-modal-content--centered">
      <modal-close-button @click="emitClose" />
      <h3>Import Automator Script</h3>
      This will create a new automator script at the end of your list.
      <input
        v-model="input"
        ref="input"
        type="text"
        class="c-modal-input c-modal-import__input"
        @keyup.enter="importSave"
        @keyup.esc="emitClose"
      />
      <div v-if="isValid">
        Script name: {{ scriptName }}
        <br>
        Line count: {{ lineCount }}
        <div
          v-if="hasErrors"
          style="color: red;"
        >
          Warning: This script has errors which need to be fixed before it can be run!
        </div>
      </div>
      <div v-else-if="input.length !== 0">
        Invalid Automator script string
      </div>
      <primary-button
        class="o-primary-btn--width-medium c-modal-import__import-btn c-modal__confirm-btn"
        @click="importSave"
      >
        Import
      </primary-button>
    </div>`
});