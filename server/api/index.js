import { Router } from 'express'
import User from '../model/User'
import users from './users'
const router = Router()

/*
router.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  console.log('token ' + token)
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, myconfig.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        next()
      }
    })
  } else {
    console.log('token ' + token)
    res.redirect('/')
  }
})
*/

// POST /api/login to log in the user and add him to the req.session.authUser
router.post('/login', function (req, res) {
  const tempuser = new User()
  tempuser._id = req.body.email
  User.findOne(tempuser, function (err, user) {
    if (err) throw err
    if (!user) {
      res.status(401).json({message: 'Authentication failed. User not found!'})
    } else {
      if (!tempuser.validPassword(req.body.password, user.password)) {
        res.status(401).json({message: 'Authentication failed. Wrong password.'})
      } else {
        // expires in 24 hours
        req.session.authUser = user
        res.json({ user: user })
      }
    }
  })
})

// POST /api/logout to log out the user and remove it from the req.session
router.post('/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// Add USERS Routes
router.use(users)

export default router
