const Alexa = require('alexa-sdk');
const Axios = require('axios');




const handlers = {
    'LaunchRequest': function () {
    	this.emit(':tell', 'Welcome to the NFL Crime skill. What would you like to know?');
	},
	'CrimeIntent': function () {
        const intentObj = this.event.request.intent;
        const self = this;
        if (intentObj.slots.date.value){
            console.log(intentObj.slots.date.value);
        }
        if (intentObj.slots.team.value){
            console.log(intentObj.slots.team.value);
        }
        Axios.get('http://nflarrest.com/api/v1/crime?limit=1')
          .then(function (response) {
            var data = response.data[0]
            self.emit(':tell', 'The most common crime is  %s and was committed %s times', data['Category'],data['arrest_count']);
          })
          .catch(function (error) {
            console.log(error);
          });
	},
    'PlayerIntent': function () {
        const intentObj = this.event.request.intent;
        const self = this;
        if (intentObj.slots.date.value){
            console.log(intentObj.slots.date.value);
        }
        if (intentObj.slots.team.value){
            console.log(intentObj.slots.team.value);
        }
        Axios.get('http://nflarrest.com/api/v1/player?limit=1')
          .then(function (response) {
            var data = response.data[0]
            self.emit(':tell', 'The player with the most player arrests is %s on the %s with %s arrests', data['Name'],data['Team_name'],data['arrest_count']);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    'TeamIntent': function () {
        const intentObj = this.event.request.intent;
        const self = this;
        if (intentObj.slots.date.value){
            console.log(intentObj.slots.date.value);
        }
        Axios.get('http://nflarrest.com/api/v1/team?limit=1')
          .then(function (response) {
            var data = response.data[0]
            self.emit(':tell', 'The team with the most player arrests is %s with %s arrests', data['Team_preffered_name'],data['arrest_count']);
          })
          .catch(function (error) {
            console.log(error);
          });
    	},

};




exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.appId = 'amzn1.ask.skill.844848f2-f3e9-48fa-88df-1055d93e976a' // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.

    alexa.execute();
};