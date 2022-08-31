import Vue from "vue";
import 'element-ui/lib/theme-chalk/index.css';
import {Button,Table,TableColumn,Row,Col,Input,Dialog,Form,FormItem,Card,Cascader,Select,Option,MessageBox} from 'element-ui'

Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Card)
Vue.use(Cascader)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$confirm=MessageBox.confirm;


