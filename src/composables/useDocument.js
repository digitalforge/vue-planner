import { ref } from "vue"
import { db } from "../firebase/config"

import { doc, deleteDoc, updateDoc } from "firebase/firestore"

const useDocument = (col, id) => {
  const error = ref(null)
  const isPending = ref(false)

  const removeDoc = async () => {
    try {
      await deleteDoc(doc(db, col, id))
      isPending.value = false
      error.value = null
    } catch (err) {
      isPending.value = false
      error.value = err.message
    }
  }

  const updateDocument = async (song) => {
    isPending.value = true
    error.value = null

    const docReference = doc(db, col, id)

    try {
      await updateDoc(docReference, {
        songs: song,
      })
      isPending.value = false
      error.value = false
      console.log("doc updated")
    } catch (err) {
      console.log(err.message)
    }
  }

  return { error, removeDoc, updateDocument, isPending }
}

export default useDocument
