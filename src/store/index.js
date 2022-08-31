import Vue from "vue";
import Vuex from 'vuex'
import {getUser,setUser} from '@/utils/user'
Vue.use(Vuex)
const  state = {
    actionList:[],
    userList: getUser()?getUser(): [
        {
        name:'黄成杰',
        age:22,
        sex:'男',
        phone:17777496267,
        basicAddress:['广东省','广州市','海珠区'],
        moreAddress:'空心岩',
        address:'广东省广州市越秀区 空心岩'
        }
        ]
}
const mutations  = {
    //记录对userList的数据修改
    addActions(state,currentUserList){
        //对数据进行浅拷贝
        let newArr = currentUserList.map(item=>({...item}))
        state.actionList.unshift(newArr)
        setUser(state.userList)
    },
    addUser(state,data){
        state.userList.push(data)
        setUser(state.userList)
    },
    modifyUser(state,data){
        let index = state.userList.findIndex(item=>item.name === data.name)
        state.userList.splice(index,1,data)
        setUser(state.userList)
    },
    deleteOneUser(state,name){
        let index = state.userList.findIndex(item=>item.name === name)
        state.userList.splice(index,1)
        setUser(state.userList)
    },
    deleteMore(state,data){
        let newArr  = state.userList.filter(userItem=>{
          let index=  data.find(item=>item.name === userItem.name)
            if(!index)
            {
                return true
            }
            }
        )
        state.userList = newArr
        setUser(state.userList)
    },
    //撤销
    revoke(state){
        console.log('ss')
        let newarr = state.actionList.shift()
        state.userList = [...newarr]
        setUser(state.userList)
    }

}
const actions ={
    addUser({commit},data){
        //先对数据进行记录
        commit('addActions',[...state.userList])
        commit('addUser',data)
    },
    modifyUser({commit},data){
        commit('addActions',[...state.userList])
        commit('modifyUser',data)
    },
    deleteOneUser({commit},name){
        commit('addActions',[...state.userList])
        commit('deleteOneUser',name)
    },
    deleteMore({commit},data){
        commit('addActions',[...state.userList])
        commit('deleteMore',data)
    },
     async revoke({commit}){
        if(state.actionList.length)
        {
            commit('revoke')
        }else{
            return Promise.reject('您还没有进行任何操作哦！！')
        }


    },
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})
