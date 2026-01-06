import { MCPClient } from '@mastra/mcp';

export const macHotelClient = new MCPClient({
  id: 'hotel-mcp',
  servers: {
    hotel: {
      url: new URL('https://hotel.gqmg.com/mcp/'),
    },
  },
});
