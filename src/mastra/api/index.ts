import { toAISdkStream } from '@mastra/ai-sdk';
import { registerApiRoute } from '@mastra/core/server';
import { createUIMessageStream, createUIMessageStreamResponse } from 'ai';

const chatapi = registerApiRoute('/chat/:agentId', {
  method: 'POST',
  handler: async (c) => {
    const { messages } = await c.req.json();
    const agentId = c.req.param('agentId');
    const mastra = c.get('mastra');
    const agent = mastra.getAgentById(agentId);

    // 2. 获取模型流
    const stream = await agent.stream(messages, {
      // 全局控制
      providerOptions: {
        deepseek: {
          max_tokens: 64000,
          thinking: { type: 'enabled' },
        },
      },
    });

    // 3. 转换流并开启推理 (sendReasoning: true)
    const uiMessageStream = createUIMessageStream({
      originalMessages: messages,
      execute: async ({ writer }) => {
        // 使用 toAISdkStream 转换 Mastra 流为 AI SDK 格式
        for await (const part of toAISdkStream(stream, {
          from: 'agent',
          sendReasoning: true,
        })) {
          await writer.write(part);
        }
      },
    });

    // 4. 返回流响应
    return createUIMessageStreamResponse({ stream: uiMessageStream });
  },
});

export default chatapi;
