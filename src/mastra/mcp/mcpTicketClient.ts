import { MCPClient } from '@mastra/mcp';

export const mcpTicketClient = new MCPClient({
  id: 'ticket-mcp',
  servers: {
    'flight-ticket-server': {
      command: 'uvx',
      args: ['flight-ticket-mcp-server@latest'],
    },
  },
});
