---
title: "Markdown 写作指南"
date: 2026-05-28
tags: ["教程", "Markdown"]
category: 技术
description: "本博客支持的 Markdown 语法和扩展功能一览。"
draft: false
---

本文介绍博客支持的 Markdown 语法。

## 基础语法

### 标题

使用 `#` 到 `######` 表示 h1 到 h6。

### 强调

- **粗体** 使用 `**粗体**`
- *斜体* 使用 `*斜体*`
- ~~删除线~~ 使用 `~~删除线~~`

### 列表

无序列表：
- 项目一
- 项目二
  - 子项目

有序列表：
1. 第一步
2. 第二步
3. 第三步

### 链接和图片

[链接文字](https://example.com)

图片：`![alt](/images/example.jpg)`

### 引用

> 这是一段引用文字。

### 表格

| 功能 | 支持 | 说明 |
|------|------|------|
| 代码高亮 | ✓ | Shiki |
| 数学公式 | ✓ | KaTeX |
| 目录 | ✓ | 自动生成 |

## 扩展语法

### 代码高亮

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

### 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
