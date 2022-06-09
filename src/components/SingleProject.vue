<template>
  <div class="project" :class="{ complete: project.complete }">
    <div class="actions">
      <h3 @click="showDetails = !showDetails">{{ project.title }}</h3>
      <div class="icons">
        <router-link :to="{ name: 'EditProject', params: { id: project.id } }"
          ><span class="material-icons"> edit </span></router-link
        >

        <span class="material-icons" @click="deleteProject(project.id)">
          delete
        </span>
        <span class="material-icons tick" @click="toggleComplete(project)"
          >done</span
        >
      </div>
    </div>
    <div class="details" v-if="showDetails">
      <p>{{ project.details }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  props: ["project"],
  setup(props, context) {
    let showDetails = ref(false)
    let uri = ref("http://localhost:3000/projects/")

    const deleteProject = (id) => {
      fetch(uri.value + id, { method: "DELETE" }).then(
        context.emit("delete", id)
      )
    }

    const toggleComplete = (project) => {
      fetch(uri.value + project.id, {
        method: "PATCH",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ complete: !project.complete }),
      })
        .then(context.emit("updateComplete", project.id))
        .catch((err) => console.log(err.message))
    }

    return { showDetails, deleteProject, toggleComplete }
  },
}
</script>

<style>
.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #e90074;
}

h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}

.project.complete {
  border-left: 4px solid #00ce89;
}

.project.complete .tick {
  color: #00ce89;
}
</style>
