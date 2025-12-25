import { MCPClient } from '@mastra/mcp';

export const mcpMapAmapClient = new MCPClient({
  id: 'mcp-amap-maps',
  servers: {
    'amap-maps': {
      command: 'npx',
      args: ['-y', '@amap/amap-maps-mcp-server'],
      env: {
        AMAP_MAPS_API_KEY: '1e5aa2645ef346e5a63d050f393cbdf1',
      },
    },
  },
});
