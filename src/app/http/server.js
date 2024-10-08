const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('user_db.json')

// /!\ Bind the router db to the app
app.db = router.db

const rules = auth.rewriter({
    // Permission rules
    "/users*": "/600/users$1",
    "/messages*": "/640/messages$1",
    // Other rules
    '/posts/:category': '/posts?category=:category',
  })
  
// You must apply the middlewares in the following order
app.use(rules)
app.use(auth)
app.use(router)
app.listen(8086)