import { MCPClient } from '@mastra/mcp';

// export const mcpGithubClient = new MCPClient({
//   id: 'github-mcp',
//   servers: {
//     github: {
//       command: 'npx',
//       args: [
//         '-y',
//         '@modelcontextprotocol/server-github'
//       ],
//       env: {
//         GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_API_KEY || '',
//       },
//     },
//   },
// });

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
