/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DefaultChatTransport, type ToolUIPart } from 'ai';
import { PromptInput, PromptInputBody, PromptInputTextarea } from '@/components/ai-elements/prompt-input';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from '@/components/ai-elements/tool';
import { HOST } from '@/constants';
import { useChat } from '@ai-sdk/react';

const Chat = ({ agentPath }: any, ref: any) => {
  const [input, setInput] = React.useState<string>('');
  const { messages, sendMessage, status, setMessages, clearError } = useChat({
    transport: new DefaultChatTransport({
      // api: 'http://ai.xiaoshengkai.com/chat/owner-agent',
      api: `${HOST}/chat/${agentPath.current}`,
      // api: `${HOST}/chat`,
    }),
  });

  const handleSubmit = async () => {
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput('');
  };

  React.useImperativeHandle(ref, () => {
    return {
      setMessages,
      clearError,
      setInput,
    };
  });

  return (
    <div className='max-w-4xl mx-auto p-6 relative size-full h-screen'>
      <div className='flex flex-col h-full'>
        <Conversation className='h-full'>
          <ConversationContent>
            {messages.map((message: any) => (
              <div key={message.id}>
                {message.parts?.map((part: any, i: any) => {
                  if (part.type === 'reasoning') {
                    return (
                      <div key={`${message.id}-${i}`} className='my-4 max-w-[90%]'>
                        <details className='group' open>
                          <summary className='flex items-center gap-2 cursor-pointer list-none text-xs text-slate-500 hover:text-blue-500 transition-colors'>
                            {/* 思考状态的小图标 */}
                            <div className='w-4 h-4 rounded-full border-2 border-slate-300 border-t-blue-500 animate-spin group-open:animate-none group-open:border-blue-500' />
                            <span className='font-medium tracking-wide uppercase'>已深度思考</span>
                            {/* 展开/收起指示器 */}
                            <svg
                              className='w-3 h-3 transition-transform group-open:rotate-180'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                            </svg>
                          </summary>

                          <div className='mt-2 ml-2 pl-4 border-l-2 border-slate-200 text-sm text-slate-600 leading-relaxed italic antialiased opacity-90'>
                            {part.text}
                          </div>
                        </details>
                      </div>
                    );
                  }

                  if (part.type === 'text') {
                    return (
                      <Message key={`${message.id}-${i}`} from={message.role}>
                        <MessageContent>
                          <MessageResponse>{part.text}</MessageResponse>
                        </MessageContent>
                      </Message>
                    );
                  }

                  if (part.type?.startsWith('tool-')) {
                    return (
                      <Tool key={`${message.id}-${i}`}>
                        <ToolHeader
                          type={(part as ToolUIPart).type}
                          state={(part as ToolUIPart).state || 'output-available'}
                          className='cursor-pointer'
                        />
                        <ToolContent>
                          <ToolInput input={(part as ToolUIPart).input || {}} />
                          <ToolOutput output={(part as ToolUIPart).output} errorText={(part as ToolUIPart).errorText} />
                        </ToolContent>
                      </Tool>
                    );
                  }

                  return null;
                })}
              </div>
            ))}
            <ConversationScrollButton />
          </ConversationContent>
        </Conversation>
        <PromptInput onSubmit={handleSubmit} className='mt-20'>
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              className='md:leading-10 textarea'
              value={input}
              placeholder='请输入'
              disabled={status !== 'ready'}
              contentEditable
            />
          </PromptInputBody>
        </PromptInput>
      </div>
    </div>
  );
};

export default React.forwardRef(Chat);
