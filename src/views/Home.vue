<template>
  <div class="home">
    <Filter @filterChange="current = $event" :current="current" />
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject
          :project="project"
          @delete="handleDelete"
          @updateComplete="updateComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue"
import SingleProject from "../components/SingleProject.vue"
import Filter from "../components/Filter.vue"

export default {
  name: "HomeView",
  components: { SingleProject, Filter },
  setup(props, context) {
    const projects = ref([])
    const current = ref("all")

    onMounted(() => {
      fetch("http://localhost:3000/projects")
        .then((res) => res.json())
        .then((data) => (projects.value = data))
        .catch((err) => console.log(err.message))
    })

    const filteredProjects = computed(() => {
      if (current.value === "all") {
        return projects.value
      }
      if (current.value === "completed") {
        return projects.value.filter((proj) => proj.complete === true)
      }
      if (current.value === "ongoing") {
        return projects.value.filter((proj) => proj.complete === false)
      }
    })

    const handleDelete = (id) => {
      projects.value = projects.value.filter((project) => project.id !== id)
    }

    const updateComplete = (id) => {
      let p = projects.value.find((project) => project.id === id)
      p.complete = !p.complete
    }

    return { projects, handleDelete, updateComplete, filteredProjects, current }
  },
}
</script>
