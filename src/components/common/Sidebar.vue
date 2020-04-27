<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
           
            unique-opened
            @select="handleSelect"
        >
            <el-submenu index="businessManagement">
                <template slot="title">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">计划任务管理</span>
                </template>
                <template v-for="item in menuList">
                    <template v-if="!item.isChild">
                        <el-submenu :index="item.name" :key="item.name">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.title }}</span>
                            </template>
                            <template v-for="subItem in item.children">
                                <el-submenu
                                    v-if="!subItem.isChild"
                                    :index="subItem.name"
                                    :key="subItem.name"
                                >
                                    <template slot="title">{{ item.title }}</template>
                                    <el-menu-item
                                        v-for="(threeItem, i) in subItem.children"
                                        :key="i"
                                        :index="threeItem.name"
                                    >{{ threeItem.title }}</el-menu-item>
                                </el-submenu>
                                <el-menu-item
                                    v-else
                                    :index="subItem.name"
                                    :key="subItem.name"
                                >{{ subItem.title }}</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <el-menu-item v-else :index="item.name" :key="item.name">{{ item.title }}</el-menu-item>
                </template>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import _ from 'lodash';

function convertRouteToMenuItem({ children, meta, name, path }, parentPath) {
    const link = parentPath.indexOf('/') !== parentPath.length - 1 ? `${parentPath}${path}` : `${parentPath}${path}`;
    const retChildren = [];
    if (children && children.length > 0) {
        children.forEach(item => {
            retChildren.push(convertRouteToMenuItem(item, path));
        });
    }
    return {
        name,
        title: meta.title,
        path: link,
        isChild: _.isEmpty(retChildren),
        icon: meta.icon || '',
        children: retChildren
    };
}
export default {
    data() {
        return {
            collapse: false
        };
    },
    inject: ['bus'],
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
        menuList() {
            const ret = [];
            const mainRoute = this.$router.options.routes[0];
            mainRoute.children.forEach(item => {
                ret.push(convertRouteToMenuItem(item, mainRoute.path));
            });
            return ret;
        }
    },
    created() {
        // // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        // this.bus.$on('collapse', msg => {
        //     this.collapse = msg;
        //     this.bus.$emit('collapse-content', msg);
        // });
    },
    mounted() {
        this.bus.$on('collapse', msg => {
            this.collapse = msg;
            this.bus.$emit('collapse-content', msg);
        });
    },
    methods: {
        handleSelect(index) {
            this.$router.push({
                name: index
            });
        },
       
    }
};
</script>

<style lang="scss" scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar > ul {
    height: 100%;
}
</style>
