export default class Socket {
    /**
     * @description: 初始化实例属性，保存参数
     *
     */
    constructor(options) {
        this.url = options.url;
        this.callback = options.received;
        this.name = options.name || 'default';
        this.ws = null;
        this.status = null;
        this.pingTimeout = null;  // 心跳检测计时器
        this._timeout = 3000;   // 心跳检测频率
        this.isHeart = options.isHeart;  // 是否进行心跳检测
        this.isReconnection = options.isReconnection;  // 是否断开重连
        this.heartBag = 0;   // 连续没收到心跳包回复次数
        this.maxHeartBag = 3;   // 最大连续没收到心跳包回复次数
        this.reconnectTime = 0;  // 重连次数
        this.maxReconnectTime = 10000;  // 最大重连次数
    }
    resetData(data) {
        this.initData = data;
        this.ws.send(JSON.stringify(data));
    }
    connect(fn) {
        console.log('连接中', this.status)
        if (this.status == 'open'){ return }
        this.ws = new WebSocket(this.url);
        this.initFn = fn;  // 初始化完成后的调用方法
        // 建立连接
        this.ws.onopen = (e) => {
            this.status = 'open';
            this.heartBag = 0;  // 心跳检测重置
            this.reconnectTime = 0;  // 重连次数重置
            console.log("连接成功", e)
            // 给后台发送数据
            if (fn) { fn(); }
            if (this.isHeart) {   // 心跳检测
                this.pingTimeout = setTimeout(() => {
                    this._heartCheck();
                }, this._timeout) 
            } 
        }
        // 接受服务器返回的信息
        this.ws.onmessage = (e) => {
            this.heartBag = 0;
            if (typeof this.callback === 'function'){ // 收到消息回调函数
                this.callback(e.data)
            }
        }
        // 关闭连接
        this.ws.onclose = (e) => {
            console.log('onclose', 'this.status = '+ this.status, e)
            // this._closeSocket(e)
        }
        // 报错
        this.ws.onerror = (e) => {
            console.log('onerror', e);
            this.status = 'onerror';
            this._closeSocket(e)
        }
    }
    reconnect() {
        if (this.ws.readyState == 1) { // 连接还存在,先关闭一趟
            this.close();
        } 
        this._resetHeart();
        console.log('重连reconnect', this.ws);
        if (this.reconnectTime > this.maxReconnectTime){ 
            console.log('都重连'+this.maxReconnectTime+'次了,不连了,fuck');
            return; 
        }
        this.reconnectTime++;
        setTimeout(()=>{
            console.log('重连connect');
            this.connect(this.initFn);
        }, 2000)
        
    }
    sendMsg(data) {
        if (this.status == 'open'){
            let msg = JSON.stringify(data)
            return this.ws.send(msg)
        }
    }
    _resetHeart() {
        clearTimeout(this.pingTimeout)
        return this
    }
    _heartCheck() {
        if (this.heartBag > this.maxHeartBag){  // 连续3个心跳包没回应就重连
            console.log('3个心跳包没回应,进行重连')
            this.status = 'onerror';
            this.reconnect();
            return
        }
        this.pingTimeout = setTimeout(() => {
            this._heartCheck();
        }, this._timeout)
        this.heartBag++
        if (this.ws.readyState === 1) {
            this.ws.send(JSON.stringify(this.initData))
        }
    }
    _closeSocket(e) {
        if (this.status !== 'close') {
            console.log('意外断开，重连', e)
            if (this.isReconnection){ this.reconnect(); }  // 重连
        } else {
            console.log('手动关闭了,不进行重连', e)
        }
    }
    close() {
        if (this.status == 'close'){ return null; }
        console.log('close()');
        this.status = 'close'
        this._resetHeart()
        // this.ws.close();
    }
}
