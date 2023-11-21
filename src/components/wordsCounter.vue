<template>
  <div>
    <label>Choose a file: </label>
    <input
      ref="fileUpload"
      type="file"
      accept=".txt"
      @change="handleFileChange"
    />

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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { loggingLevels } from "../services/loggingLevels";
import { showMessage, showError, log } from "../services/notificationService";

const wordCount = ref([]);
const fileContent = ref("");
const fileUpload = ref(null);

function readFileContent(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      resolve(e.target.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
}

function countWords(content) {
  try {
    const words = content.trim().split(/\s+/);
    return words.reduce((countMap, word) => {
      if (word.length > 0) {
        const lowerCaseWord = word.toLowerCase();
        countMap[lowerCaseWord] = (countMap[lowerCaseWord] || 0) + 1;
      }
      return countMap;
    }, {});
  } catch (error) {
    log(loggingLevels.error, error);
  }
}

function handleFileChange(event) {
  try {
    const file = event.target.files[0];
    log(loggingLevels.log, "new file :", file);

    readFileContent(file)
      .then((content) => {
        fileContent.value = content;
        showMessage("New File Uploaded");
        wordCount.value = countWords(content);
      })
      .catch((error) => {
        log(loggingLevels.error, error);
        showError("Failed to read file");
      });

    fileUpload.value.value = "";
  } catch (error) {
    log(loggingLevels.error, error);
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
