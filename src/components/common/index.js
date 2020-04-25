import crumbs from './crumbs/index.vue';
import dytable from './dytable/dytable.vue';
const components = {
    crumbs,
    dytable
};
const install = Vue => {
    Object.keys(components).forEach(com => {
        Vue.component(components[com].name, components[com]);
    });
};
const comIstall = {
    ...components,
    install
};
export default comIstall;
