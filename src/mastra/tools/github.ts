import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY,
});

export const getProject = createTool({
  id: 'getProject',
  description: `获取github项目`,
  inputSchema: z.object({
    owner: z.string(),
    repo: z.string(),
  }),
  outputSchema: z.object({
    result: z.json(),
  }),
  execute: async (inputData) => {
    try {
      const result = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: inputData.owner,
        repo: inputData.repo,
      });
      console.log('resultresult', result);

      return result;
    } catch (error) {
      console.log('error', error);

      return {};
    }
  },
});
