<template>
    <div class="vip_userInfo">
        <div class="left" :class="userRankTitle[data.title]">
            <img :src="data.head" alt="">
            <div class="kuang" :style="{
                backgroundImage: `url('https://oss.wemew.com/wemew/wechat/images/game_rank/e_txk_${userRankTitle[data.title]
                    }.png')`,
            }"></div>
        </div>
        <div class="right">
            <div class="user_name font1 f20">
                {{ data.userName }}
            </div>
            <div class="level_box">
                <div class="level f30 jianbian font2">
                    LV{{ data.level }}
                </div>
                <div class="title f20 jianbian font1">
                    {{ data.title }}
                </div>
            </div>
            <div class="tiao">
                <div class="tiao_bg"></div>
                <div class="tiao_current" :style="{ width: (data.restScore / data.allScore) * 100 + '%' }"></div>
            </div>
            <div class="f16 font1 chaoyue">
                {{ data.restScore }}/{{ data.allScore }} &nbsp;&nbsp;超越了{{
                        data.rate
                }}%的用户
            </div>
        </div>
        <img class="sanjiao" src="https://oss.wemew.com/wemew/wechat/images/games/bigDrinkGod/sanjiao.png" alt="">
    </div>
</template>
<script lang="ts" setup>

type myPropsType = {
    data: {
        'title': string,
        'head': string,
        'level': number | string,
        'allScore': string,
        'rate': string,
        'userName': string,
        'restScore': string
    }
}
const props = withDefaults(defineProps<myPropsType>(), {
    data: {
        title: '超凡',
        head: '',
        level: 0,
        allScore: '0',
        rate: '0',
        userName: '',
        restScore: '0'
    }
})
const userInfo = ref();
const userRankTitle = {
    "超凡": "chaofan",
    "传说": "chuanshuo",
    "达人": "daren",
    "大师": "dashi",
    "高手": "gaoshou",
    "天尊": "tianzun",
    "新星": "xinxing",
    "战神": "zhanshen",
    "至尊": "zhizun",
    "宗师": "zongshi",
};
const show = ref(false);
const open = () => {


};
</script>
<style lang="scss" scoped>
.vip_userInfo {
    width: 341px;
    height: 158px;
    background: rgba($color: #000000, $alpha: 0.8);
    position: absolute;
    top: -168px;
    left: 0;
    display: flex;
    border-radius: 10px;
    align-items: center;
    z-index: 9;

    .sanjiao {
        width: 10px;
        position: absolute;
        bottom: -9px;
        left: 40px;
    }

    .left {
        margin: 0 9px 0 14px;

        .kuang {
            width: 105px;
            height: 123px;
            background-size: contain;
            background-repeat: no-repeat;
        }

        img {
            position: absolute;
            width: 84px;
            height: 84px;
            top: 30px;
            left: 20px;
            border-radius: 100%;
            z-index: -1;
        }

        &.chaofan {
            img {
                left: 26px;
            }
        }

        &.daren {
            img {
                left: 20px;
                top: 24px;
                width: 88px;
                height: 88px;
            }
        }

        &.dashi {
            img {
                left: 20px;
                top: 30px;
                width: 88px;
                height: 88px;
            }
        }

        &.gaoshou {
            img {
                left: 26px;
            }
        }

        &.xinxing {
            img {
                left: 20px;
                top: 24px;
                width: 88px;
                height: 88px;
            }
        }

        &.zhanshen {
            img {
                left: 20px;
                top: 38px;
                width: 80px;
                height: 80px;
            }
        }

        &.zhizun {
            img {
                left: 24px;
                top: 30px;
            }
        }

        &.zongshi {
            img {
                left: 28px;
            }
        }
    }

    .right {
        text-align: left;

        .user_name {
            height: 19px;
            line-height: 19px;
        }

        .level_box {
            display: flex;
            justify-content: flex-start;
            height: 40px;

            .level {
                font-weight: 600;
            }

            .title {
                line-height: 40px;
            }

            .jianbian {
                background: linear-gradient(to top, #ff2f92, #fff);
                color: transparent;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }

        .tiao {
            position: relative;
            width: 193px;
            height: 6px;

            .tiao_bg {
                width: 193px;
                height: 6px;
                background: #000000;
                border: 1px solid #5e5e5e;
                border-radius: 4px;
                position: absolute;
                top: 0;
                left: 0;
            }

            .tiao_current {
                width: 40%;
                height: 6px;
                background: #ffffff;
                border-radius: 3px;
                position: absolute;
                top: 1px;
                left: 0;
            }
        }

        .chaoyue {
            margin-top: 12px;
        }
    }
}
</style> 
