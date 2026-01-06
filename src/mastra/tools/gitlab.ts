import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import axios from 'axios';
import { error } from 'console';

export const getProjectByGitlab = createTool({
  id: 'getProject',
  description: `获取github项目`,
  inputSchema: z.object({
    name: z.string(),
  }),
  outputSchema: z.object({
    result: z.any(),
  }),
  execute: async (inputData) => {
    try {
      const res = await axios.get(
        `https://git.cai-inc.com/api/v4/projects?access_token=${process.env.GITLAB_API_KEY}&name=${inputData.name}`
      );

      console.log('resresresresres', res.data?.[0]);

      return {
        result: res.data,
      };
    } catch (error) {
      console.log('error', error);
      return {
        result: '获取项目失败',
      };
    }
  },
});
