import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { Observability } from '@mastra/observability';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { ownerAgent } from './agents/owner-agent';
import { chatRoute } from '@mastra/ai-sdk';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, ownerAgent },
  storage: new LibSQLStore({
    id: 'mastra-storage',
    // stores observability, scores, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ':memory:',
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  observability: new Observability({
    // Enables DefaultExporter and CloudExporter for tracing
    default: { enabled: true },
  }),
  server: {
    host: '0.0.0.0',
    // cors: {
    //   origin: ["*"], 
    //   allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    //   allowHeaders: ["Content-Type", "Authorization", "x-mastra-client-type"],
    //   // credentials: true,
    // },
    apiRoutes: [
      chatRoute({
        path: '/chat/:agentId',
        defaultOptions: {
          maxSteps: 10, // 允许模型进行更多次的工具调用循环
          providerOptions: {
            deepseek: {
              max_tokens: 8000, // 尝试调大单次响应的 token 限制
              stream: true
            },
          },
        },
      }),
    ],
  },
});
