<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="v in crumbsData"
                          :key="v.name">
        {{v.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'crumb',
  mounted () {
  },
  computed: {
    crumbsData () {
      console.log(this.$route)
      const { matched } = this.$route
      return matched
    }
  }
}
</script>