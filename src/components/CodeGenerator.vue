<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { generateCode } from '../utils/deepseek'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

const userPrompt = ref('')
const generatedCode = ref('')
const isLoading = ref(false)
const selectedFramework = ref<'vue' | 'react'>('vue')

const handleGenerate = async () => {
  try {
    isLoading.value = true
    const code = await generateCode({
      prompt: userPrompt.value,
      lang: selectedFramework.value,
    })
    generatedCode.value = code
    await nextTick()
    Prism.highlightAll()
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <div class="generator-container">
      <el-select v-model="selectedFramework" placeholder="选择框架">
        <el-option label="Vue3" value="vue" />
        <el-option label="React" value="react" />
      </el-select>

      <el-input
        v-model="userPrompt"
        type="textarea"
        placeholder="输入需求，如：生成一个带搜索功能的表格组件，支持分页"
        :autosize="{ minRows: 4, maxRows: 6 }"
        class="custom-textarea"
      />

      <el-button type="primary" :loading="isLoading" @click="handleGenerate"> 生成代码 </el-button>

      <pre v-if="generatedCode" class="code-block">
      <code class="language-javascript">{{ generatedCode }}</code>
    </pre>
    </div>
  </div>
</template>

<style scoped>
.generator-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 800px;
  margin: 2rem auto;
}

.code-block {
  background: #2d2d2d;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
