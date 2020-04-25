<template>
    <div class="task-context">
        <el-card class="box-card">
            <el-form :model="formInline" class="form-inline" inline>
                <el-form-item label="单据号">
                    <el-input v-model="formInline.voucherId"></el-input>
                </el-form-item>
                <el-form-item label="年度">
                    <el-date-picker v-model="formInline.voucherId" type="year" placeholder="选择年"></el-date-picker>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="onSubmit">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="pd-5 mgt-10">
            <div slot="header" class="clearfix">
                <span>搜索结果</span>
                <div class="fr">
                    <el-button size="small" icon="el-icon-folder-add">新增</el-button>
                </div>
            </div>
            <dytable
                :columns="columns"
                :table-data="table"
                :total="total"
                ref="multipleTable"
                :page-num="pageNum"
                :page-size="pageSize"
                @current-change="onCurrentChange"
                @on-selection-change="onSelectionChange"
                @size-change="onSizeChange"
                v-loading="false"
                element-loading-text="加载中"
            ></dytable>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'task-context',
    data() {
        const { renderControlColumn } = this;
        return {
            formInline: {
                voucherId: '', // 单据号
                year: '' // 年度
            },
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'state',
                    title: '状态',
                    width: '100'
                },
                {
                    key: 'company',
                    title: '公司',
                    width: '100'
                },
                {
                    key: '',
                    title: '部门',
                    width: '100'
                },
                {
                    key: 'people',
                    title: '年度'
                },
                {
                    key: 'date',
                    title: '单据号'
                },
                {
                    key: 'date',
                    title: '经办人'
                },
                {
                    key: 'content',
                    title: '经办日期',
                    width: '140px'
                },
                {
                    key: 'content',
                    title: '备注',
                    width: '140px'
                },
                {
                    title: '操作',
                    render: renderControlColumn,
                    width: '260px'
                }
            ],
            table: [
                {
                    state: '2016-05-02',
                    date: '王小虎',
                    content: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            pageNum: 1,
            pageSize: 10,
            total: 10
        };
    },
    methods: {
        onSubmit() {
            console.log('提交');
        },
        onSelectionChange(val) {
            console.log('多选', val);
            this.multipleSelection = val;
        },
        onSizeChange(val) {
            this.pageSize = val;
        },
        onCurrentChange(val) {
            this.pageNum = val;
        },
        // 查看
        onRowLookButtonClick(row) {
            console.log(row, '查看');
        },
        //删除
        onRowDeleteButtonClick(row) {
            console.log(row, '删除');
        },
        //编辑
        onRowUpdateButtonClick(row) {
            console.log(row, '编辑');
        },
        renderControlColumn({ row }) {
            const { onRowDeleteButtonClick, onRowLookButtonClick, onRowUpdateButtonClick } = this;
            const ret = [];
            ret.push(
                <div>
                    <el-button type="text" icon="el-icon-folder-opened" onClick={() => onRowLookButtonClick(row)}>
                        查看
                    </el-button>
                    <el-button type="text" icon="el-icon-edit" onClick={() => onRowUpdateButtonClick(row)}>
                        编辑
                    </el-button>
                    <el-button type="text" style="color:red" icon="el-icon-delete" onClick={() => onRowDeleteButtonClick(row)}>
                        删除
                    </el-button>
                </div>
            );
            return <div>{ret}</div>;
        }
    }
};
</script>
<style scoped lang="scss">
</style>
