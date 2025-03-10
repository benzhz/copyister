**Read this in other languages: [English](README.md), [中文](README_zh.md).**

## 简介

如果你与大模型交流，得到的冗长回答常常让人苦恼，复制你需要内容耗时又费力。为此，我开发了这个内容摘取复制工具（chrome插件），助你轻松提取关键信息。

操作类似课本画重点的方式，支持你逐行标记所需内容，精准圈定关键信息，完成标记后，一键即可复制选中内容，方便快速应用到文档撰写、报告整理等场景。界面简洁直观，无复杂操作流程，轻松上手。

## 使用方法
1. 下载与启动：从本仓库下载工具程序，解压，谷歌浏览器安装插件。  
2. 粘贴内容：将大模型给出的回答完整粘贴到工具的输入框内。
3. 标记复制：逐行勾选你认为是重点的内容，完成后点击复制按钮，即可将选中内容复制到剪贴板。

## 应用场景
• 学术研究：快速从大模型的知识讲解中提取核心观点用于文献综述。

• 工作汇报：从大模型提供的行业分析里摘取关键数据和结论。

• 日常学习：在大模型解答学习问题时，提取要点辅助笔记整理 。

## 演示
### 安装
![](https://cdn.nlark.com/yuque/0/2025/png/38711469/1741603882602-70feddc7-51e1-49bb-8624-4aaaf58164e9.png)

![](https://cdn.nlark.com/yuque/0/2025/png/38711469/1741603903674-5ca1b94b-8b1b-4006-a0a2-ff13190f1135.png)

打开chrome，输入chrome://extensions/ ，按enter

![](https://cdn.nlark.com/yuque/0/2025/png/38711469/1741604521228-5720e80a-0d12-4f39-912f-12ff8e46a71e.png)

选择你解压的文件夹

![](https://cdn.nlark.com/yuque/0/2025/png/38711469/1741604278059-2d794f1a-f02f-4803-83e8-c90df982da23.png)

安装完成

![](https://cdn.nlark.com/yuque/0/2025/png/38711469/1741604333587-8bc748e1-73a4-440f-a1cf-59f37b142f6d.png)



### 使用
①、安装完插件，打开你要复制内容的页面，按下ctrl+shift+c键，在浏览器窗口的右下角会弹出小弹窗（拖拽可移动）；

②、在页面上选取文本，会高亮文本，并记录在小弹窗，

③、点击小弹窗complete按钮，完成一次复制；

④、你可以在你的文档里进行粘贴；

![](https://github.com/benzhz/copyister/blob/main/public/images/use.gif)

## 开发
### 技术栈
vite、react、antd

### 开发环境
<font style="color:rgb(31, 35, 40);">node：v20.18.1</font>

<font style="color:rgb(31, 35, 40);">pnpm ：10.5.1</font>

+ **<font style="color:rgb(31, 35, 40);">安装依赖</font>**

```bash
pnpm install
```

+ **<font style="color:rgb(31, 35, 40);">运行</font>**

```bash
pnpm dev
```

+ **<font style="color:rgb(31, 35, 40);">打包</font>**

```bash
pnpm build
```

如果你在使用过程中有任何问题或建议，欢迎提交Issues，让我们一起让这个工具更实用！

