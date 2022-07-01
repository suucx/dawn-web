export type nObjectType = Record<string, any>
export type nParamsType = { 
    [props: string]: any
}


export type baseUserType = {
    nickname: string, // 昵称
    head: string, //头像
    score: number, // 积分
    maxScoreZodiac: number, //最大积分对应生肖
}



// 生肖分数配置type
export type zodiacScoreConfigType = {
    score: number, //生肖基础分数
    zodiac: number, //生肖下标
}
// 生肖分数配置列表type
export type zodiacScoreConfigListType = zodiacScoreConfigType[];

// 生肖 等级 倍数 配置 蓝色 紫色 金色
export type zodiacScoreRateConfigListType = number[];

export type zodiacMotionItemType = {
    zodiacList: number[], //	numberArray	生肖抽取结果 长度固定为3
    score: number, //	总积分
    maxScoreZodiac:	number, //	zodiacList 中最大积分对应生肖
    sameZodiac: number[], // numberArray, //	zodiacList中相同生肖下标
    extraScore:	number, //	sameZodiac 不为空时 额外积分
    maxFlag: number, //	是否是连抽中的最大积分 1 是
    [props: string]: any
}

// 轮训返回数据格式
export type zodiacRankUserInfoType = {
    userId:string, //	玩家ID
    nickname: string, //玩家昵称
    head: string, //玩家昵称
    hasAllZodiacs?: number, //是否集齐十二生肖 1 是
    score: number,
    maxScoreZodiac: number,
    payId: string, //支付单号 用于上送该笔订单是否再大屏播放
    [props: string]: any
}


// 轮训返回数据格式
export type zodiacOpenInfoType = {
    userId:string, //	玩家ID
    nickname: string, //玩家昵称
    head: string, //玩家昵称
    hasAllZodiacs: number, //是否集齐十二生肖 1 是
    resultList:	zodiacMotionItemType[],	//生肖抽取结果
    payId:	string, //支付单号 用于上送该笔订单是否再大屏播放
    [props: string]: any
}

export type zodiacOpenInfoListType = {
    openInfoList: zodiacOpenInfoType[]
}

// 展示抽奖返回处理后的数据
export type formatMotionDataType = {
    zodiacList: number[];
    score: number;
    maxScoreZodiac: number;
    sameZodiac: number[];
    extraScore: number;
    maxFlag: number;
    head: string;
    nickname: string;
    userId: string;
    hasAllZodiacs: number;
}

type gameMasterType = {
    nickname: string,
    head: string,
    score?: number, //积分
    maxScoreZodiac?: number, //最大积分对应生肖
    prizeName?: string,
    prizeUrl?: string,
    prizeCount?: string,
}
// 展示游戏结果 擂主页
export type gameFinishMasterDataType = {
    championResultInfos: gameMasterType[], //擂主说明
    topResultInfos: gameMasterType[], //排名靠前玩家说明
    zodiacResultInfos: gameMasterType[], // 集齐生肖获奖玩家说明
}


// 游戏弹窗 传参 type 
export type gamePopOptionsType = {
    type: string, //弹窗标识
    props?: nParamsType,
}

// 游戏奖品信息
export type gamePrizeItemType = {
    gameId: string, //游戏Id
    recordId?: string, //
    prizeName: string, //	奖品名称
    prizeCount: number, //	奖品数量
    prizeUnit: string, //	奖品单位
    prizeUrl: string, //	奖品图片地址
    prizeType: number, //	奖品类型 1 十二生肖奖 3 擂主奖池
    cashState: number, //	兑换状态 1未兑换 2 已兑换
    gameTime: string, //	时间
}