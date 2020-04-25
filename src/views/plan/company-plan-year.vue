<template>
    <div class="company-plan-year">公司年度计划汇总</div>
</template>

<script>
export default {
    name: 'company-plan-year',
    mounted() {
        var a = { a: 1 };
        var b = { b: 1 };
        var c = Object.assign(a, b);
        console.log(c);
        console.log(a);
        console.log(b);
    }
};
</script>