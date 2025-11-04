<!-- API's -->
POST /signup
POST /login
Post /logout 


profilRouter 
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

connection requtestrouter
POST /request/interested/:userid
POST /request/ignored/:userid
POST /request/review/accepted/userid
POST /request/review/rejected/userid

userrouter 
GET /user/connections
GET /user/requests
GET /user/feed
