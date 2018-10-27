<template>
    <div class="diagio">
        <el-dialog :visible.sync="$store.state.showdiago" width="552px" :close-on-click-modal=false>
            <span slot="title" class="title">
                               <img src="../../static/img/refresh.png" alt="">
                               <em>立即刷新</em>
                           </span>
            <div class="diagio_content">
                <img src="../../static/img/ppp.png" alt="">
                <p>可刷新次数
                    <i>{{$store.state.refreshlist.refreshnum}}</i> 次
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                          <el-button @click="refresh()">刷 新</el-button>
                    </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                refreshUrl: '',
                refreshnum: '',
            }
        },
        methods: {
            //点击刷新
            refresh() {
                if (this.$store.state.refreshlist.currentId == 1) {
                    this.refreshUrl = '/chongdu/pet/refresh.do?id=' + this.$store.state.refreshlist.id;
                }else {
                    this.refreshUrl = '/chongdu/goods/refresh.do?id=' + this.$store.state.refreshlist.id;
                }
                this.$http({
                    url: this.refreshUrl,
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$store.state.showdiago = false;
                        this.refreshnum = Math.random();
                        this.$emit("refreshNum", this.refreshnum)
                        this.$message({
                            message: '刷新成功',
                            type: 'success'
                        })
                    }else{
                         this.$store.state.showdiago = false;
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .diagio {
        .el-dialog {
            height: 485px;
            .el-dialog__header {
                padding-top: 10px;
                padding-left: 12px;
                height: 46px;
                background-color: @commonColor;
                box-sizing: border-box;
                .title {
                    color: #fff;
                    font-size: 18px;
                    box-sizing: border-box;
                    img {
                        vertical-align: middle;
                        margin-right: 3px;
                    }
                }
                .el-dialog__headerbtn {
                    top: 14px;
                    .el-icon-close {
                        color: #fff;
                        font-size: 26px;
                    }
                }
            }
            .el-dialog__body {
                padding: 0;
                .diagio_content {
                    width: 100%;
                    img {
                        display: block;
                        margin: 36px auto 0;
                    }
                    p {
                        text-align: center;
                        font-size: 18px;
                        color: #2ec2b4;
                        i {
                            color: #fb1334;
                            font-size: 36px;
                            margin-left: 14px
                        }
                    }
                }
            }
            .el-dialog__footer {
                text-align: center;
                .el-button--default {
                    display: inline-block;
                    width: 128px;
                    height: 35px;
                    font-size: 16px;
                    color: #fff;
                    background-color: @commonColor;
                    padding: 0;
                    margin-top: 15px;
                }
            }
        }
    }
</style>

