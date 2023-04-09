const express = require('express');
const app = express();
const connection = require('./database/database');
const bodyPaser = require('body-parser');
const cors = require('cors')






const usersModels = require('./models/users/users');
const userOptionsModels = require('./models/userOptions/userOptions');
const emailValidatorModels = require('./models/emailVeridator/emailVeridator');
const newPasswordModels = require('./models/newPassword/newPassword');
const countriesModels = require('./models/countries/countries');
const quizReponsers = require('./models/quizReponsers/quizReponsers');
const citiesModels = require('./models/cities/cities');
const radiosModels = require('./models/radios/radios');
const noticiesCategoriesModels = require('./models/noticiesCategories/noticiesCategories');
const noticiesModels = require('./models/noticies/noticies');
const financesModels = require('./models/finances/finances');
const plannersModels = require('./models/planners/planners');
const plannersAttachmentsModels = require('./models/plannersAttachments/plannersAttachments');
const plannersStepsModels = require('./models/plannersSteps/plannersSteps');
const plannersCommentsModels = require('./models/plannersComments/plannersComments');
const plannersSuggestionsModels = require('./models/plannersSuggestions/plannersSuggestions');



const usersController = require('./controllers/users/users');
const userOptionsController = require('./controllers/userOptions/userOptions');
const quizResponsers = require('./controllers/quizResponsers/quizResponsers');
const countriesController = require('./controllers/countries/countriesControllers');
const citiesController = require('./controllers/cities/citiesControllers');
const radiosController = require('./controllers/radios/radiosControllers');
const noticiesCategoryController = require('./controllers/noticiesCategories/noticiesCategories');
const noticiesArticleController = require('./controllers/noticiesArticles/noticiesArticles');
const financeController = require('./controllers/finances/finances');
const plannersController = require('./controllers/planners/planners');
const plannersStepsController = require('./controllers/plannersSteps/plannersSteps');
const plannersAttachmentsController = require('./controllers/plannersAttachments/plannersAttachments');
const plannersCommentsController = require('./controllers/plannersComments/plannersComments');
const plannersSuggestionsController = require('./controllers/plannersSuggestions/plannersSuggestions');


app.use(cors());


app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }))






app.use('/', express.static('public'));
app.use('/', usersController);
app.use('/', userOptionsController);
app.use('/', quizResponsers);
app.use('/', countriesController);
app.use('/', citiesController);
app.use('/', radiosController);
app.use('/', noticiesCategoryController);
app.use('/', noticiesArticleController);
app.use('/', financeController);
app.use('/', plannersController);
app.use('/', plannersStepsController);
app.use('/', plannersAttachmentsController);
app.use('/', plannersCommentsController);
app.use('/', plannersSuggestionsController);



connection
    .authenticate()
    .then(() => {
        console.log('Database Connected')
    })
    .catch((error) => {
        console.log(error)
    });








app.listen(process.env.PORT || 3000, () => {
    console.log('Server Running')
});