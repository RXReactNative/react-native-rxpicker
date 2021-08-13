 export default [
  // -------------- 北京 -----------
  // 一级
  {
    cityLevel: 1,
    cityName: '北京',
    cityId: 1,
    parentId: 0,
  },
  // 二级
  {
    cityLevel: 2,
    cityName: '北京市',
    cityId: 11,
    parentId: 1,
  },
  // 三级
  {
    cityLevel: 3,
    cityName: '密云县',
    cityId: 110,
    parentId: 11
  },
  {
    cityLevel: 3,
    cityName: '通州区',
    cityId: 111,
    parentId: 11
  },
  {
    cityLevel: 3,
    cityName: '朝阳区',
    cityId: 112,
    parentId: 11
  },
  {
    cityLevel: 3,
    cityName: '海淀区',
    cityId: 113,
    parentId: 11
  },
  {
    cityLevel: 3,
    cityName: '怀柔区',
    cityId: 114,
    parentId: 11
  },

  // -------------- 上海 -----------
  // 一级
  {
    cityLevel: 1,
    cityName: '上海',
    cityId: 2,
    parentId: 0,
  },
  // 二级
  {
    cityLevel: 2,
    cityName: '上海市',
    cityId: 12,
    parentId: 2,
  },
  // 三级
  {
    cityLevel: 3,
    cityName: '闵行区',
    cityId: 120,
    parentId: 12
  },
  {
    cityLevel: 3,
    cityName: '崇明县',
    cityId: 121,
    parentId: 12
  },
]