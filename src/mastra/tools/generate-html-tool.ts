import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import OSS from 'ali-oss';
import fs from 'fs';
import path from 'path';

const uploadOssFile = async (fileName: string, filePath: string) => {
  const client = new OSS({
    // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-beijing',
    // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
    accessKeyId: 'LTAI5t7k6EsAQZiG4ZQG8G4P',
    accessKeySecret: 'r9a8LkKvdl5ctH5m4WHxEnLVYyXrpp',
    // 填写Bucket名称。
    bucket: 'xiaosheng-tt2',
    endpoint: 'https://bucket.xiaoshengkai.com',
    cname: true, // 启用CNAME，表示使用了自定义域名
  });

  // 自定义请求头
  const headers = {
    // 指定Object的存储类型。
    'x-oss-storage-class': 'Standard',
    // 指定Object的访问权限。
    'x-oss-object-acl': 'private',
    // 设置Object的标签，可同时设置多个标签。
    'x-oss-tagging': 'Tag1=1&Tag2=2',
    'Content-Type': 'text/html; charset=utf-8',
    // 设置浏览器以内联方式显示，而不是下载
    'Content-Disposition': 'inline',
  };

  try {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await client.put(
      `tmep-ai/${fileName}`,
      filePath,
      // 自定义headers
      { headers }
    );

    const previewUrl = await client.signatureUrl(result.name, {
      expires: 223600, // URL过期时间，秒为单位
    });

    return previewUrl;
  } catch (e) {
    console.log(e);
  }
};

export const generateHtmlTool = createTool({
  id: 'ownerAgentTool',
  description: `
    - 接受其他agentTool工具生成的HTML代码进行处理，以及获取到文件名称（如果没有自己临时创建，以.html结尾保证它是个html文件）
    - 如果碰到多次执行，请告知是否是最后一次生成，得到isLast一定是个boolean类型
  `,
  inputSchema: z.object({
    input: z.string(),
    htmlFileName: z.string(),
    isLast: z.boolean(),
  }),
  outputSchema: z.object({
    content: z.string(),
    htmlURL: z.string(),
  }),
  execute: async (inputData) => {
    console.log('contextcontextcontextcontext', inputData);

    const localFile = path.join('./', inputData.htmlFileName);
    await fs.appendFileSync(localFile, inputData.input, 'utf-8');

    if (!inputData.isLast) {
      return {
        content: `继续生成`,
        htmlURL: `无`,
      };
    }

    const fileURL = await uploadOssFile(inputData.htmlFileName, localFile);

    return {
      content: `我为你生成了一个预览页面地址为：${fileURL}，点击新页面打开`,
      htmlURL: `${fileURL}`,
    };
  },
});
