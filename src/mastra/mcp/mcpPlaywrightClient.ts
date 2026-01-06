import { MCPClient } from '@mastra/mcp';

export const mcpPlaywright = new MCPClient({
  id: 'playwright-mcp',
  servers: {
    playwright: {
      command: 'npx',
      args: ['-y', '@executeautomation/playwright-mcp-server'],
    },
  },
});
