import { MCPClient } from '@mastra/mcp';

export const mcpWeatherClient = new MCPClient({
  id: 'mcp-weather',
  servers: {
    weather: {
      command: 'npx',
      args: ['-y', '@timlukahorstmann/mcp-weather'],
      env: { ACCUWEATHER_API_KEY: 'zpka_0328bb70d96a4d44b5fd804c7825a2aa_ccfd8185' },
    },
  },
});
