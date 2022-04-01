<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>节点信息</span>
    </div>
    <div class="text item">
      <el-row>
        <el-col :span="12">人员编号：</el-col>
        <el-col :span="12">{{ currentNode.id }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">姓名：</el-col>
        <el-col :span="12">{{ currentNode.name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">别名：</el-col>
        <el-col :span="12">{{ currentNode.other_name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">性别：</el-col>
        <el-col :span="12">{{ currentNode.sex }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">角色：</el-col>
        <el-col :span="12">{{ currentNode.role }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">原形：</el-col>
        <el-col :span="12">{{ currentNode.original_shape }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">居住地：</el-col>
        <el-col :span="12">{{ currentNode.place }}</el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "DetailPanel",
  components: {},
  data() {
    return {
      currentNode: {
        id: "",
        name: "",
        original_shape: "",
        other_name: "",
        place: "",
        role: "",
        sex: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang='' scoped>
</style>