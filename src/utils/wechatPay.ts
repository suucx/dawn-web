import { nObjectType } from "./typings";
import { Toast } from "vant";

const wechatPay = (treeMap: nObjectType, id:string) => {
    return new Promise((resolve) => {
        // 唤起微信支付,treeMap:微信签名
        if (window.WeixinJSBridge == undefined || window.WeixinJSBridge == null) {
            Toast.fail("支付出错");
            resolve('erroe');
        }
        window.WeixinJSBridge.invoke("getBrandWCPayRequest", treeMap, (res: { err_msg: string; }) => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                resolve('ok');
            }
            if (res.err_msg == "get_brand_wcpay_request:cancel") {
                Toast.fail("支付取消");
                resolve('cancel');
                return 'cancel'
            }
            if (res.err_msg == "get_brand_wcpay_request:fail") {
                Toast.fail("支付失败请稍后再试");
                resolve('fail');
            }
        });
    })
};
export default wechatPay;