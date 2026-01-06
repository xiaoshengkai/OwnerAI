import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { mcpGithubClient } from '../mcp/mcpGithubClient';
import { getProject } from '../tools/github';
import * as gitlabTools from '../tools/gitlab';

export const codeAnalysisAgent = new Agent({
  id: 'code-analysis-agent',
  name: '代码分析助手',
  instructions: [
    {
      role: 'system',
      content: '您是一位根据源代码分析的专家，帮助用户实现以下功能。',
    },
    {
      role: 'system',
      content: `
      功能一：如果用给的是github项目地址，那么进行以下分析
        - 拉取github仓库的拉取代码
        - 然后进行源码分析，
        - 根据用户要求分析最终输出可被复制的readme.md文档
        - 注意：使用中文说明
      `,
    },
    {
      role: 'system',
      content: `
      功能二：如果用给的是gitlab项目地址，那么进行以下分析
        - 拉取gitlab仓库的拉取代码
        - 然后进行源码分析，
        - 根据用户要求分析最终输出可被复制的readme.md文档
        - 注意：使用中文说明
      `,
    },
    {
      role: 'system',
      content: `
        过程中的注意点：
        - 如果解析时间预计非常长
        - 如果获取的项目代码量特别大
        - 出现上述情况，请分多次调用工具分析执行
      `,
    },
  ],
  model: 'deepseek/deepseek-chat',
  tools: {
    ...(await mcpGithubClient.listTools()),
    // getProject,
    // ...gitlabTools,
  },
  memory: new Memory(),
});
