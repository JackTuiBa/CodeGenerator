import axios from 'axios'
import { ElMessage } from 'element-plus'

const DEEPSEEK_API_KEY = 'sk-91dcbcc628124e0f8e4c7e8cf420cd10'

interface CodeGenerationParams {
  prompt: string
  lang: 'vue' | 'react'
}

export const generateCode = async (params: CodeGenerationParams) => {
  let data = JSON.stringify({
    messages: [
      {
        content: 'You are a helpful assistant',
        role: 'system',
      },
      {
        content: 'Hi',
        role: 'user',
      },
    ],
    model: 'deepseek-chat',
    frequency_penalty: 0,
    max_tokens: 2048,
    presence_penalty: 0,
    response_format: {
      type: 'text',
    },
    stop: null,
    stream: false,
    stream_options: null,
    temperature: 1,
    top_p: 1,
    tools: null,
    tool_choice: 'none',
    logprobs: false,
    top_logprobs: null,
  })
  try {
    const response = await axios.post(
      '/api',
      // 'https://api.deepseek.com/chat/completions',
      // {
      //   prompt: `生成${params.lang}组件代码，要求：${params.prompt}。使用最新语法，添加详细注释`,
      //   temperature: 0.7,
      //   max_tokens: 1000,
      // },
      data,
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return response.data.choices[0].text
  } catch (error) {
    ElMessage.error('服务器请求繁忙，请稍后再试')
  }
}
