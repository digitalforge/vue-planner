<template>
  <form @submit.prevent="handleSubmit">
    <label for="title">Title:</label>
    <input type="text" required v-model="title" />
    <label>Details:</label>
    <textarea required v-model="details"></textarea>
    <button>Submit</button>
  </form>
</template>

<script>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

export default {
  props: ["id"],
  setup(props, context) {
    const title = ref("")
    const details = ref("")
    const route = useRoute()
    const router = useRouter()
    const uri = ref("http://localhost:3000/projects/" + route.params.id)

    onMounted(() => {
      fetch(uri.value)
        .then((res) => res.json())
        .then((data) => {
          title.value = data.title
          details.value = data.details
        })
    })

    const handleSubmit = () => {
      let p = {
        title: title.value,
        details: details.value,
      }

      fetch(uri.value, {
        method: "PATCH",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(p),
      }).then(() => router.push({ name: "home" }))
    }

    return { title, details, handleSubmit }
  },
}
</script>

<style></style>
