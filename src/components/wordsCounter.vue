<script setup>
import { ref } from "vue";
import { loggingLevels } from "../services/loggingLevels";
import { showMessage, showError, log } from "../services/notificationService";

const wordCount = ref([]);
const fileContent = ref("");
const fileUpload = ref(null);

function readFile(event) {
  if (event && event.target && event.target.files.length > 0) {
    try {
      const file = event.target.files[0];
      log(loggingLevels.log, "new file :", file);
      const reader = new FileReader();

      reader.onload = (e) => {
        fileContent.value = e.target.result;

        showMessage("New File Uploaded");
        const words = fileContent.value.trim().split(/\s+/);
        wordCount.value = words.reduce((countMap, word) => {
          if (word.length > 0) {
            const lowerCaseWord = word.toLowerCase();
            countMap[lowerCaseWord] = (countMap[lowerCaseWord] || 0) + 1;
          }
          return countMap;
        }, {});
      };

      reader.readAsText(file);
      fileUpload.value.value = "";
    } catch (error) {
      log(loggingLevels.error, error);
      showError("Not faild input");
    }
  } else {
    showError("Not faild input");
  }
}

function clearData() {
  try {
    fileUpload.value.value = "";
    fileContent.value = "";
    wordCount.value = [];
  } catch (error) {
    log(loggingLevels.error, error);
  }
}
</script>

<template>
  <label>Choose a file: </label>
  <input ref="fileUpload" type="file" accept=".txt" @change="readFile" />

  <h2>File Content</h2>
  <textarea readonly style="height: 258px; width: 100%">{{
    fileContent
  }}</textarea>

  <h2>Word Count</h2>
  <div v-if="wordCount">
    <p v-for="(count, word) in wordCount" :key="word">
      {{ word }}: {{ count }}
    </p>
  </div>

  <button @click="clearData">Clear</button>
</template>
