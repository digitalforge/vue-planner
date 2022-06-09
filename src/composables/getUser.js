import { ref } from "vue"

//firebase imports
import { auth } from "../firebase/config"
import { onAuthStateChanged } from "firebase/auth"

// ref
const user = ref(auth.currentUser)

onAuthStateChanged(auth, (_user) => {
  // console.log("User state changed. Current user is:", _user)
  user.value = _user
})

const getUser = () => {
  return { user }
}

export default getUser
