/*
 * @Author: taojinchao
 * @Date: 2023-02-07 19:45:55
 * @LastEditors: taojinchao
 * @LastEditTime: 2024-03-30 00:34:54
 * @Description: 单元测试配置文件
 */
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest' // ts文件使用ts-jest
  }
};

// jest.config.js 常规配置

// module.exports = {

//   rootDir: 'src',             // 测试根目录, 默认值：包含了 jest 配置文件的根目录
//   preset: 'ts-jest',          // 直接测试 ts 代码需要配置 ts-jest
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   verbose: false,             // 指示是否应在运行期间报告每个测试, 默认值：false
//   globals: {                  // 测试环境中可使用的全局变量
//     // handle TypeScript
//     'ts-jest': {
//       tsconfig: {
//         target: 'es6',
//         sourceMap: true,
//       },
//     },
//   },
//   transform: {                   // 转换器
//     '\\.(ts|tsx)$': 'ts-jest',
//   },
//   moduleFileExtensions: ['ts']， // 模块文件扩展，默认值：["js", "jsx", "ts", "tsx", "json", "node"]
//   moduleNameMapper: {            //  模块名映射
//     '^@/(.*)$': '<rootDir>/src/$1',
//     '^@utils/(.*)$': '<rootDir>/src/utils/$1',
//     // ...genNpmAliasMapper(),
//     '@king-fisher/env': `<rootDir>/packages/env/__tests__/${PLATFORM_ENV}env.mock.ts`,
//     '@king-fisher/utils': '<rootDir>/packages/utils/src/index.ts',
//     '@king-fisher/apis': '<rootDir>/packages/apis/src/index.ts',
//     '@hummer/hummer-front': '<rootDir>/__mocks__/hummer-front/index.ts',
//   },
//   testMatch: [                  // 测试文件匹配【在__tests__目录下*.test.{ts,tsx}的文件】
//     TEST_API ? `**/${TEST_API}/__tests__/*.test.{ts,tsx}` : '**/__tests__/**/*.test.{ts,tsx}',
//   ],
//   collectCoverage: !TEST_API,               // 是否应该收集测试覆盖率，默认值：false
//   coverageDirectory: '<rootDir>/coverage',  // 测试覆盖率输出的目录
//   collectCoverageFrom: [                    // 从哪里收集测试覆盖率
//     'packages/**/src/**/*.{ts,tsx}',
//     '!packages/**/src/types.{ts,tsx}',
//     '!packages/env/**/*.{ts,tsx}',
//     '!packages/**/device/**/*.{ts,tsx}',
//     '!packages/**/dist/**/*',
//     '!packages/apis/src/jsApis/**/*',
//     '!packages/apis/src/index.*',
//     '!packages/apis/src/interactive/**/*',
//     '!packages/interactive/{background,keyboard}/**/*.{ts,tsx}',
//   ],
// };

// 备注：
//   Jest 配置解读： https://juejin.cn/post/7003595612977365028

//   Jest运行单个测试文件:  https://www.jianshu.com/p/c3a09a710201
//   命令： npm run test "/Users/taojinchao/Desktop/基础函数库/Kingfisher-ths-common/packages/kaihu-business/__tests__/getParaByName.test.ts"
