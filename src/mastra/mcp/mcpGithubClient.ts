import { MCPClient } from '@mastra/mcp';

/**
 * 都是走Git协议，拉取代码进行整合分析
 * 拓展点：
 *   - 也适合gitlab,只要本地存在账号token,有权限拉取代码就可以！
*/
export const mcpGithubClient = new MCPClient({
  id: 'repomix-mcp',
  servers: {
    repomix: {
      command: 'npx',
      args: [
        '-y',
        'repomix',
        '--mcp',
        '--compress',
      ],
    },
  },
});
