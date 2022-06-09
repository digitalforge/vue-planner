import { ref } from "@vue/reactivity"
import { db } from "../firebase/config"
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "@firebase/firestore"
import { watchEffect } from "vue"

const getCollection = (col, q) => {
  const documents = ref(null)
  const error = ref(null)

  let collectionRef = query(collection(db, col), orderBy("createdAt", "asc"))

  if (q) {
    collectionRef = query(collection(db, col), where(...q))
  }

  const unsub = onSnapshot(
    collectionRef,
    (snapshot) => {
      let results = []
      snapshot.docs.forEach((doc) => {
        //must wait for server to create timestamp & send it back so we check for doc.data(). This uses the server snapshot not the browser snapshot
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
      })
      documents.value = results
      error.value = null
    },
    (err) => {
      console.log(err.message)
      documents.value = null
      error.value = "could not fetch data"
    }
  )

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { documents, error }
}

export default getCollection
