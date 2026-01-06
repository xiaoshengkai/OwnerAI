import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { mcpPlaywright } from '../mcp/mcpPlaywrightClient';

export const browserAgent = new Agent({
  id: 'browser-agent',
  name: '浏览器助手',
  instructions: [
    {
      role: 'system',
      content: '您是一位关于浏览器各种能力的专家，帮助用户实现以下功能。',
    },
    {
      role: 'system',
      content: `
      功能一：你能帮助用户填写好对应网页内的表单信息 `,
    },
  ],
  model: 'deepseek/deepseek-chat',
  tools: {
    ...(await mcpPlaywright.listTools()),
  },
  memory: new Memory(),
});
