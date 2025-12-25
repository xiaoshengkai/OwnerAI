import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { generateHtmlTool } from '../tools/generate-html-tool';
import { mcpMapAmapClient } from '../mcp/mcpMapAmapClient';
import { mac12306Client } from '../mcp/mcp12306Client';
import { mcpTicketClient } from '../mcp/mcpTicketClient';

export const ownerAgent = new Agent({
  id: 'owner-agent',
  name: '个人助手',
  instructions: [
    {
      role: 'system',
      content: '您是一位有用的个人助手，帮助用户实现以下功能。',
    },
    {
      role: 'system',
      content: `
      功能一：如果用户要求帮制作旅行攻略，路线等关于规划等，回复时请按照以下要求执行。
      - 开始规划绍兴到用户提到的地点路线规划
      - 制作网页地图自定义绘制旅游路线和位置。
      - 网页使用炫酷，优美，简约（随机）页面风格
        - 景区展示用3D动画效果展示，点击哪个景区地图可以定位到
        - 其中车票/机票信息需要重要展示，如果可以的话把回来的票也考虑上
      - 行程规划结果在高德地图app展示，并集成到h5页面中。
      - 同一天行程景区之间我想打车前往
      - 随机生成文件名（建议使用时间戳），最后输出展示html文件预览地址
      - 查看预览的文案更醒目，让用户知道可以点击
    `,
    },
    {
      role: 'system',
      content: `
      过程中的注意点：
      - 如果 HTML 内容预计非常长，请分多次调用工具，一点点生成，单次生成代码不超过200行（或者1000个字节），下次代码生成丛上次结束位置开始生成，并告知调用工具是否生成完整结束(必须是boolean类型)。
      - 不要使用内部<style>标签或大量CSS。用像Tailwind CSS或Bootstrap类似这样的CDN链接（必须是国内可以直连访问的资源链接）。
      - 符号不要被转义！！
    `,
    },
    {
      role: 'system',
      content: `
      关于一些key的说明：
      - 高德地图API的js SDK key为b49286ec4d5577233f3eedf3eaf59d3f
    `,
    },
  ],
  model: 'deepseek/deepseek-chat',
  tools: {
    generateHtmlTool,
    ...(await mcpMapAmapClient.listTools()),
    ...(await mac12306Client.listTools()),
    ...(await mcpTicketClient.listTools()),
  },
  memory: new Memory(),
});
