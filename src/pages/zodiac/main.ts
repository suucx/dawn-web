// 移动端适配
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import 'vant/lib/index.css';
import '~/styles/base.scss'
import './styles/main.scss'
import { Init } from '~/build' 
import App from './app.vue'
Es6Promise.polyfill()


Init(App);
