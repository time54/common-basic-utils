/*
 * @Author: taojinchao
 * @Date: 2023-07-17 17:21:10
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-14 16:39:51
 * @Description: 跳转不同的交易品类
 */

import { callNativeAsync } from '@common-basic-utils/utils';
import { DIFFERENT_CATEGORIES } from './types/enums';

interface OptionsFutures {
  // 跳转类型 【股指期货：1 期货模拟：2 期货大赛：3】
  type:
  | DIFFERENT_CATEGORIES.STOCK_FUTURES
  | DIFFERENT_CATEGORIES.SIMULATION_FUTURES
  | DIFFERENT_CATEGORIES.FUTURES_COMPETITION;
  // 比赛id
  yybid?: string;
}

interface OptionsGMG {
  yybId: string;
  // 跳转类型 【港股：1 美股：2 】
  targetType: DIFFERENT_CATEGORIES.HK_STOCK | DIFFERENT_CATEGORIES.US_STOCK;
}

interface OptionsFund {
  yybId: string;
}

/**
 * @description: 跳转期货
 * @param {string} type  跳转类型 【股指期货：1 期货模拟：2 期货大赛：3】
 * @param {string} yybid 比赛id(可选)
 * @remark 1）股指期货：yybid客户端写死10001
 *         2）期货模拟：yybid客户端写死1
 *         3）期货大赛：根据参数取值
 */
const moniJumpFutures = (Options: OptionsFutures) => {
  callNativeAsync('moniJumpQH', Options);
};

/**
 * @description: 跳转港美股
 * @param {string} targetType  跳转类型 【港股：1 美股：2 】
 * @param {string} yybId 比赛id
 */
const moniJumpGMG = (Options: OptionsGMG) => {
  callNativeAsync('moniJumpGMG', Options);
};

/**
 * @description: 跳转两融
 * 无入参
 */
const moniJumpRZRQ = () => {
  callNativeAsync('moniJumpRZRQ', {});
};

/**
 * @description: 跳转场外基金
 * @param {string} yybId 比赛id
 */
const moniJumpOutsideFund = (Options: OptionsFund) => {
  callNativeAsync('moniJumpOutsideFund', Options);
};

/**
 * @description 模拟跳转不同交易品类
 * ``` typescript
   jumpToDifferentCategories对象包含以下属性：
      期货: stockFutures-股指期货 simulationFutures-期货模拟  futuresCompetition-期货大赛
      港美股: HK-港股 US-美股
      两融: RZRQ-两融
      场外基金: outsideFund-场外基金(yybid：26)
 * ```
 * 说明：股指期货、期货模拟 、两融不需要传比赛id
 * @example
  moniJumpToDifferentCategories.stockFutures();// 跳转股指期货
  moniJumpToDifferentCategories.futuresCompetition('yybid'); // 跳转期货大赛
 */
const jumpToDifferentCategories: any = {
  stockFutures: () => {
    moniJumpFutures({ type: DIFFERENT_CATEGORIES.STOCK_FUTURES });
  },
  simulationFutures: () => {
    moniJumpFutures({ type: DIFFERENT_CATEGORIES.SIMULATION_FUTURES });
  },
  RZRQ: () => {
    moniJumpRZRQ();
  },
  futuresCompetition: (yybid: string) => {
    moniJumpFutures({ type: DIFFERENT_CATEGORIES.FUTURES_COMPETITION, yybid });
  },
  HK: (yybId: string) => {
    moniJumpGMG({ yybId, targetType: DIFFERENT_CATEGORIES.HK_STOCK });
  },
  US: (yybId: string) => {
    moniJumpGMG({ yybId, targetType: DIFFERENT_CATEGORIES.US_STOCK });
  },
  outsideFund: (yybId: string) => {
    moniJumpOutsideFund({ yybId });
  }
};

export default jumpToDifferentCategories;
