const formatDate = (date) => {
  return new Date(date * 1000).toLocaleString()
}

export default formatDate
