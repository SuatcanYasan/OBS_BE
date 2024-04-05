const {app} = require('./utils/init');
const routes = require('./routes');
require('dotenv').config();
require('path');


app.use('/api', routes)

app.listen(5454, () => {
    console.log('Server is started..! ', 5454);
});
