<!--
 * @Author: taojinchao
 * @Date: 2024-02-02 01:35:35
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-14 14:00:37
 * @Description: 基础函数库
-->

# 基础函数库

## 项目初始化

```bash
pnpm install
```

## 项目构建

全量构建（所有模块）：

```bash
pnpm run build:test(测试环境)
pnpm run build:prod(生产环境)
```

单个模块构建：

```bash
pnpm run build:test --pkg=utils(测试环境)
pnpm run build:prod --pkg=utils(生产环境)
```
