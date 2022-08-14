const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cors = require("cors");

const app = express()
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(express.json())
app.use('/images', express.static('images'))
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))
require("./routes/image.routes")(app);

// static files
// app.use(express.static('public'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// module.exports = app
const port = process.env.PORT || 8080

app.listen(port, () => console.info(`Server is up on http://localhost:${port}`))
