const checkAuth = require('./auth');
const checkRoleAuth = require('./roleAuth');
const desactivateRoute = require('./desactivateRoute');


module.exports = {
    checkAuth,
    checkRoleAuth,
    desactivateRoute
}