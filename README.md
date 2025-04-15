<!--
 * @Author: taojinchao
 * @Date: 2024-02-02 01:35:35
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-15 17:15:43
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

## 项目发布

```bash
# 创建一次变更记录
pnpm changeset

# 生成版本和 changelog
pnpm changeset version

# 发布所有模块
pnpm run publish

# 发布指定模块
pnpm run publish --pkg=utils
```

## 说明文档

```bash
pnpm run docs
```
