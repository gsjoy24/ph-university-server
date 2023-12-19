### server steps

route ⇒ validation middleware ⇒ controller ⇒ service

### my steps

service ⇒ controller ⇒ route

#### generate 64 random bytes
 require('crypto').randomBytes(32).toString('hex')