/*
 * @Author: taojinchao
 * @Date: 2025-04-09 13:34:53
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-09 13:47:56
 * @Description: ruleCheck.ts 单元测试
 */
import { validateIDCard, validatePhoneNumber } from '../src/ruleCheck';

describe('validateIDCard', () => {
  it('should return true for a valid ID card number', () => {
    const idCard = '330621199101042157';
    expect(validateIDCard(idCard)).toBe(true);
  });

  it('should return false for an invalid ID card number', () => {
    const idCard = '123456789012345';
    expect(validateIDCard(idCard)).toBe(false);
  });

  it('should return false for an ID card number with incorrect checksum', () => {
    const idCard = '110101199003074671';
    expect(validateIDCard(idCard)).toBe(false);
  });
});

describe('validatePhoneNumber', () => {
  it('should return true for a valid phone number', () => {
    const phoneNumber = '18888888888';
    expect(validatePhoneNumber(phoneNumber)).toBe(true);
  });

  it('should return false for an invalid phone number', () => {
    const phoneNumber = '1234567890';
    expect(validatePhoneNumber(phoneNumber)).toBe(false);
  });

  it('should return false for a phone number with incorrect prefix', () => {
    const phoneNumber = '28888888888';
    expect(validatePhoneNumber(phoneNumber)).toBe(false);
  });
});
