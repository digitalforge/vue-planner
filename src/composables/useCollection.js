import { ref } from "vue"
import { db } from "../firebase/config"
import { addDoc, collection } from "firebase/firestore"

const useCollection = (col) => {
  const error = ref(null)
  const isPending = ref(false)

  const addDocument = async (doc) => {
    error.value = null
    isPending.value = true
    try {
      const res = await addDoc(collection(db, col), doc)
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      error.value = err.message
      isPending.value = false
    }
  }

  return { error, addDocument, isPending }
}

export default useCollection
