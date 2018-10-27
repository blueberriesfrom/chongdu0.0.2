<template>
    <div>
        <div class="operate">
            <div @click="godetailclick($props.itemlist,$props.currentId)" class="span">详细信息</div>
            <div @click="getrefresh($props.itemlist,$props.currentId)" class="span">立即刷新</div>
            <div @click="goundercarriage($props.itemlist,$props.currentId)" class="span down">下架</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                changlist: "",
            }
        },
        methods: {
            //点击刷新
            getrefresh(item, currentId) {    
                this.$store.state.showdiago = true; 
                item.currentId = currentId;
                this.$store.state.refreshlist = item;   
            },
            //下架currentId传1;       
            goundercarriage(item, currentId) {
                if (currentId == 1) {
                    this.$http({
                            url: "/chongdu/pet/modiPetState.do",
                            methods: "post",
                            params: {
                                id: item.id,
                                s: 3
                            }
                        }).then(res => {
                            if (res.data.code == 0) {
                                this.changlist = Math.random();
                                this.$emit('childByValue', this.changlist)
                                this.$message({
                                    showClose: true,
                                    message: "下架成功",
                                    type: "success"
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else if (currentId == 2 || currentId == 3) {
                    this.$http({
                            url: "/chongdu/goods/modifyState.do",
                            method: "post",
                            params: {
                                id: item.id,
                                s: 3
                            }
                        })
                        .then(res => {
                            if (res.data.code == 0) {
                                this.changlist = Math.random();
                                this.$emit('childByValue', this.changlist)
                                this.$message({
                                    showClose: true,
                                    message: "下架成功",
                                    type: "success"
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            //去详细信息,currentId传1;
            godetailclick(item, currentId) {
                this.$router.push({
                    path: "/petdetail",
                    query: {
                        id: item.id,
                        currentid: currentId
                    }
                });
            },
        },
        props: [
            "itemlist", "currentId"
        ]
    }
</script>

<style lang="less">
    @import '../../static/css/common.less';
    .operate {
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: center;
        line-height: 80px;
        .span {
            display: inline-block;
            height: 25px;
            width: 80px;
            line-height: 25px;
            border: 1px solid @commonColor;
            border-radius: 7px;
            margin-right: 5px;
            cursor: pointer; // opacity: 0.6;
            &.down {
                width: 50px;
                margin-right: 0;
                background-color: @commonColor;
                color: #fff;
            }
        }
    }
   
</style>

