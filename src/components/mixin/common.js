export default {
  methods: {
    getWorkSpaceId(arr) {
      let result = "";
      arr.forEach(item => {
        if (item["workspace_name"] == this.$workspaceName) {
          result = item["workspace_id"];
        }
      });
      return result;
    }
  }
};
