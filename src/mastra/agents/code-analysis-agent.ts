import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { mcpGithubClient } from '../mcp/mcpGithubClient';

export const codeAnalysisAgent = new Agent({
  id: 'code-analysis-agent',
  name: '代码分析助手',
  instructions: [
    {
      role: 'system',
      content: '您是一位根据源代码分析的专家，帮助用户实现以下功能。',
    },
    {
      role: 'system',
      content: `
        过程中的注意点：
        - 如果判断超过120万个token
        - 如果存在解析时间预计非常长
        - 如果存在解析的项目代码量特别大
        - 如果存在解析的代码结构特别复杂
        - 出现上述任意一种情况，把颗粒度拆分的小一点，并多次调用工具分析执行
        - 如果出现报错，请重新尝试
      `,
    },
    {
      role: 'system',
      content: '基于用户给出的github项目信息或者gitlab项目信息，进行代码分析并做针对用户要求给出结果。',
    },
    {
      role: 'system',
      content: `
      - 功能一：如果用户要求将当前项目分析并给出项目介绍说明readme，那么请执行以下过程：
        - 拉取github仓库或者gitlab仓库的拉取代码
        - 然后进行源码分析，
        - 根据用户要求分析最终输出可被复制的readme.md文档
        - 注意：使用中文说明
        - 基于以下模版生成：
          readme 模版结构如下：

          {组件名称} - React 组件
          📦 简介

          {组件概述，解决什么问题，适用场景}

          ✨ 特性

          • 特性1

          • 特性2

          • 特性3

          🔧 安装

          npm install {包名}
          # 或
          yarn add {包名}
          # 或
          pnpm add {包名}


          🚀 快速开始

          // 使用示例


          📖 API 文档

          Props

          属性名 说明 类型 默认值 必填

          {prop} {说明} {类型} {默认值} {是/否}
          事件
          事件名 说明 回调参数

          {event} {说明} {参数}
          插槽
          插槽名 说明 作用域参数

          {slot} {说明} {参数}
          方法
          方法名 说明 参数

          {method} {说明} {参数}

          🎨 样式定制

          /* 样式定制方式 */


          📱 示例

          {使用示例展示}

          🔧 开发指南

          # 开发命令


          🤝 贡献指南

          {如何贡献代码}

          📄 许可证

          {许可证信息}

          🎯 快速使用模板


          # {组件名称}

          ## 简介
          {组件描述}

          ## 安装
          {安装命令}

          ## 使用
          jsx
          // 基础使用


          ## Props
          | 参数 | 说明 | 类型 | 默认值 |
          |------|------|------|--------|
          | {prop} | {说明} | {type} | {default} |

          ## 示例
          {代码示例}

          ## 开发
          {开发说明}


          📁 完整的 README 结构


          # {组件名称}

          ## 目录
          - [简介](#简介)
          - [特性](#特性)
          - [安装](#安装)
          - [快速开始](#快速开始)
          - [API 文档](#api-文档)
            - [Props](#props)
            - [事件](#事件)
            - [插槽](#插槽)
            - [方法](#方法)
          - [样式定制](#样式定制)
          - [示例](#示例)
          - [主题](#主题)
          - [国际化](#国际化)
          - [性能](#性能)
          - [浏览器兼容性](#浏览器兼容性)
          - [无障碍支持](#无障碍支持)
          - [TypeScript](#typescript)
          - [测试](#测试)
          - [常见问题](#常见问题)
          - [更新日志](#更新日志)
          - [开发指南](#开发指南)
          - [贡献指南](#贡献指南)
          - [许可证](#许可证)
          - [相关链接](#相关链接)
      `,
    },
    {
      role: 'system',
      content: `
        - 如何不在上述要求内
          - 那么根据用户的要求输出内容
      `
    },
  ],
  model: 'deepseek/deepseek-chat',
  tools: {
    ...(await mcpGithubClient.listTools()),
    // getProject,
    // ...gitlabTools,
  },
  memory: new Memory(),
});
