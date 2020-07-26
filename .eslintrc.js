module.exports = {
    root: true,
    extends: '@react-native-community',
    rules: {
      // 禁用行尾空白
      'no-trailing-spaces': 0,
      // 要求或禁止使用分号代替 ASI (semi)
      'semi': 0,
      "prettier/prettier": "off",
      quotes: 0,
      // 要求或禁止末尾逗号
      'comma-dangle': 0,
      // 要求或禁止文件末尾存在空行
      'eol-last': 0,
      'curly': 0,
      // 要求必须有基数 (radix)
      // https://eslint.bootcss.com/docs/rules/radix
      radix: 0,
      // https://github.com/intellicode/eslint-plugin-react-native
      'react-native/no-inline-styles': 0,
    }
  };
  