// aes加密mode类型
export enum AesModeType {
  ECB = 'ECB',
  CFB = 'CFB',
  OFB = 'OFB',
  CTR = 'CTR',
  CBC = 'CBC'
}

// aes加密padding类型
export enum AesPaddingType {
  PKCS7 = 'Pkcs7',
  ISO = 'Iso9797-1',
  ANS = 'AnsiX923',
  ISO10126 = 'Iso10126'
}