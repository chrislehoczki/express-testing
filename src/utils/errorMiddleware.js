const errorMiddleware = (err, req, res, next) => {
  console.log(`<<<<<<<<<<<<< Error: ${e}`)
  res.status(500).send({ Error: err })
}

export default errorMiddleware
