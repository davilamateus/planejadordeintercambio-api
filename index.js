const express = require('express');
const app = express();
const connection = require('./src/database/database');
const bodyPaser = require('body-parser');
const cors = require('cors')






const usersModels = require('./src/models/users/users');
const userOptionsModels = require('./src/models/userOptions/userOptions');
const emailValidatorModels = require('./src/models/emailVeridator/emailVeridator');
const newPasswordModels = require('./src/models/newPassword/newPassword');
const countriesModels = require('./src/models/countries/countries');
const quizReponsers = require('./src/models/quizReponsers/quizReponsers');
const citiesModels = require('./src/models/cities/cities');
const radiosModels = require('./src/models/radios/radios');
const noticiesCategoriesModels = require('./src/models/noticiesCategories/noticiesCategories');
const noticiesModels = require('./src/models/noticies/noticies');
const financesModels = require('./src/models/finances/finances');
const plannersModels = require('./src/models/planners/planners');
const plannersAttachmentsModels = require('./src/models/plannersAttachments/plannersAttachments');
const plannersStepsModels = require('./src/models/plannersSteps/plannersSteps');
const plannersCommentsModels = require('./src/models/plannersComments/plannersComments');
const plannersSuggestionsModels = require('./src/models/plannersSuggestions/plannersSuggestions');
const practiveLanguageModels = require('./src/models/practiceLanguage/practiceLanguage');



const usersController = require('./src/controllers/users/users');
const userOptionsController = require('./src/controllers/userOptions/userOptions');
const quizResponsers = require('./src/controllers/quizResponsers/quizResponsers');
const countriesController = require('./src/controllers/countries/countriesControllers');
const citiesController = require('./src/controllers/cities/citiesControllers');
const radiosController = require('./src/controllers/radios/radiosControllers');
const noticiesCategoryController = require('./src/controllers/noticiesCategories/noticiesCategories');
const noticiesArticleController = require('./src/controllers/noticiesArticles/noticiesArticles');
const financeController = require('./src/controllers/finances/finances');
const plannersController = require('./src/controllers/planners/planners');
const plannersStepsController = require('./src/controllers/plannersSteps/plannersSteps');
const plannersAttachmentsController = require('./src/controllers/plannersAttachments/plannersAttachments');
const plannersCommentsController = require('./src/controllers/plannersComments/plannersComments');
const plannersSuggestionsController = require('./src/controllers/plannersSuggestions/plannersSuggestions');
const practiveLanguageController = require('./src/controllers/practiceLanguage/practiceLanguage');


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
app.use('/', practiveLanguageController);



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