const errorMiddleware = (err, req, res, next) => {
  console.log(`<<<<<<<<<<<<< Error: ${err}`)
  res.status(500).send({ Error: err })
}

export default errorMiddleware
