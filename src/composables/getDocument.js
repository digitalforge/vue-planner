import { ref, watchEffect } from "vue"
import { db } from "../firebase/config"
import { doc, onSnapshot } from "firebase/firestore"

const getDocument = (col, id) => {
  const error = ref(null)
  const document = ref(null)

  const docRef = doc(db, col, id)

  const unsub = onSnapshot(
    docRef,
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id }
        error.value = null
      } else {
        error.value = "That document does not exist"
      }
    },
    (err) => {
      console.log(err.message)
      error.value = "Could not fetch data"
    }
  )

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { document, error }
}

export default getDocument
