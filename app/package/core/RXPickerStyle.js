
const DEFAULT_CONFIG = {
  // RXScrollPicker
  mtdBorderColorDark:  '#e5e5e5',
  mtdVSpacingL: 10,

  // RXPicker
  container: {
    width: '100%',
  },
  tabBarView: {
    height: 49,
  },
  btnLeftBar: {
    fontSize: 16,
    color: '#767997',
    paddingHorizontal: 15,
  },
  btnRightBar: {
    fontSize: 16,
    color: '#383E5F',
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#383E5F',
  },

  //
}

export default class RXPickerStyle {
  static get store() {
    if (!this._store) {
      this._store = DEFAULT_CONFIG;
    }
    return this._store;
  }

  static initApi (config) {
    if (!config) {
      throw new Error('RXPickerStyle -> initApi() -> config=null');
    }
    Object.assign(this.store, config)
  }
}