/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { Observability } from '@mastra/observability';
import { weatherWorkflow } from './workflows/weather-workflow';
import { ownerAgent } from './agents/owner-agent';
import { browserAgent } from './agents/browser-agent';
import { chatRoute } from '@mastra/ai-sdk';
import { registerApiRoute } from '@mastra/core/server';
import { codeAnalysisAgent } from './agents/code-analysis-agent';
import chatapi from './api'

const agents = { ownerAgent, browserAgent, codeAnalysisAgent };

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents,
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
    apiRoutes: [
      chatapi,
      registerApiRoute('/common/all-agent-pathName', {
        method: 'GET',
        handler: async (c) => {
          const obj = { ...agents } as any;
          const json = Object.keys(obj).map((agent) => {
            return {
              name: obj[agent].name,
              id: obj[agent].id,
            };
          });

          return c.json(json);
        },
      }),
    ],
  },
});
