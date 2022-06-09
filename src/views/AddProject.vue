<template>
  <form @submit.prevent="handleSubmit">
    <label for="title">Title:</label>
    <input type="text" required v-model="title" />
    <label>Details:</label>
    <textarea required v-model="details"></textarea>
    <button>Add Project</button>
  </form>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
export default {
  setup(props, context) {
    const title = ref("")
    const details = ref("")
    const uri = ref("http://localhost:3000/projects/")
    const router = useRouter()

    const handleSubmit = () => {
      let project = {
        title: title.value,
        details: details.value,
        complete: false,
      }

      fetch(uri.value, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(project),
      }).then(router.push({ name: "home" }))
    }

    return { title, details, handleSubmit }
  },
}
</script>

<style>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}
</style>
