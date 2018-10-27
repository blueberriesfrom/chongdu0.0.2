import router from "./router";
import Vue from "vue";
import "jquery";
import store from "./store";
import ElementUI from "element-ui";
import { MessageBox } from "element-ui";
import axios from "axios";
Vue.prototype.$http = axios;
Vue.use(ElementUI);
export default {
    //删除下架或者审核未通过
    deleteitem(item,currentId,cb){
      let  isdelete = false;
      let httpUrl = "";
      if(currentId == "1"){
        httpUrl  = "/chongdu/pet/delete.do?ids="+item.id;
      }else{
        httpUrl  = "/chongdu/goods/delete.do?ids="+item.id;
      }
      axios({
          url:httpUrl,
          methods:'post'
      }).then(res=>{
          console.log(res.data);
          if(res.data.code == 0){
            isdelete = true;
            typeof cb == 'function' && cb(isdelete);
            MessageBox({
                message:'删除成功',
                type:'success'
            })
          }
      }).catch(err=>{
          console.log(err)
      })
       
    },
    //选择当前某一项
    isCheckedItem(item, alllist, cb) {
        item.ischecked = !item.ischecked;
        const checkedlength = alllist.filter(o => {
            return o.ischecked == true;
        }).length;
        if (checkedlength == alllist.length) {
            alllist.ischeckedall = true;
        } else if (checkedlength == 0 || checkedlength !== alllist.length) {
            alllist.ischeckedall = false;
        }
        typeof cb == "function" && cb(alllist.ischeckedall);
    },
    //全选
    ischeckedAll(alllist,cb) {
        alllist.ischeckedall = !alllist.ischeckedall;
        if (alllist.ischeckedall == true) {
            alllist.forEach((ele, i) => {
                ele.ischecked = true;
            });
        } else if (alllist.ischeckedall == false) {
            alllist.forEach((ele, i) => {
                ele.ischecked = false;
            });
        }
        typeof cb == "function" && cb(alllist.ischeckedall);
    },
    //去宠物详情
    godetail(item, currentId) {
        router.push({
            path: "/petdetail",
            query: {
                id: item.id,
                currentid: currentId
            }
        });
    },
 
    //上传读取文件
    readupload(ele, fn) {
        let file = ele.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            typeof fn == "function" && fn(file, event);
        };
        //使用案例
        // this.base.readupload(document.querySelector("#again"), function (e) {
        //     console.log(e)
        // });
    },
};