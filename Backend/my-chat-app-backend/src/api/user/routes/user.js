module.exports = {
                   "routes": [
                     {
                       "method": "GET",
                       "path": "/users/me",
                       "handler": "custom.getMe",
                       "config": {
                         "policies": []
                       }
                     }
                   ]
                 }
