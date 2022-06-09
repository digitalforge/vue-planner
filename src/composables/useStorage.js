import { ref } from "vue"
import { storage, sRef, uploadBytes, getDownloadURL } from "../firebase/config"
import { deleteObject } from "firebase/storage"
import getUser from "./getUser"

const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = sRef(storage, filePath.value)

    try {
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!")
      })

      await getDownloadURL(storageRef).then((res) => {
        url.value = res
      })
    } catch (err) {
      error.value = err.message
    }
  }

  const deleteImage = async (path) => {
    const storageRef = sRef(storage, path)
    error.value = null

    try {
      await deleteObject(storageRef)
    } catch (err) {
      error.value = err.message
    }
  }

  return { error, url, filePath, uploadImage, deleteImage }
}

export default useStorage
