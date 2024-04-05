const {app} = require('./utils/init');
const routes = require('./routes');
require('dotenv').config();
require('path');


app.use('/api', routes)

app.listen(3000, () => {
    console.log('Server is started..! ', 3000);
});
