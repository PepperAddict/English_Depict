export const updateFields = (e, data, write) => {
  write({
    ...data, [e.target.name]: e.target.value || ''
  })
}