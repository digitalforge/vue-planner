import { signInWithEmailAndPassword } from "firebase/auth"
import { ref } from "vue"
import { auth } from "../firebase/config"

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    error.value = null
    //console.log(res)
    isPending.value = false
    return res
  } catch (err) {
    console.log(err)
    error.value = "Incorrect Login Credentials"
    isPending.value = false
  }
}

const useLogin = () => {
  return { error, login, isPending }
}

export default useLogin
