export const updateFields = (e, data) => {
  setValue({
    ...data, [e.target.name]: e.target.value || ''
  })
}