import { MCPClient } from '@mastra/mcp';

export const mac12306Client = new MCPClient({
  id: '12306-mcp',
  servers: {
    '12306-mcp': {
      command: 'npx',
      args: ['-y', '12306-mcp'],
    },
  },
});
