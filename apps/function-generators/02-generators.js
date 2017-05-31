/*
 - Conflates the input with the output
 - Doesnt wotk with control flow primitivesxx
 - Error handling
 - and doing parallel operations
 */
const fs = require('fs'),
  awaitify = require('./awaitify'),
  present = require('present');

function logDuration(startedAt, message) {
  console.log(`>> ${message} >> duration: `, present() - startedAt);
}

function getJSONSync(fileName) {
  let startedAt = present();
  let data = fs.readFileSync(fileName, 'utf-8');
  logDuration(startedAt, 'getJSONSync');
  return JSON.parse(data);
}

//async
function getJSONAsync(fileName, callback) {
  return new Promise(function (resolve, reject) {
    let startedAt = present();

    function returnResopnse(err, data) {
      if (err) {
        return reject(err);
      }
      logDuration(startedAt, 'getJSON >> Promises');
      resolve(JSON.parse(data));
    }

    fs.readFile(fileName, 'utf-8', returnResopnse);
  });
}

function callSync() {
  try {
    let data = getJSONSync('../../data/users.json');
    console.log(data);
  }
  catch (err) {
    console.error(err);
  }
}

let callAsync = awaitify(function* () {
  try {
    let data = yield getJSONAsync('../../data/users.json');
    console.log(data);
  }
  catch (err) {
    console.error(err);
  }
});

function aWeirdScenarioInSync() {
  try {
    let data = getJSONSync('../../data/users.json');
    let randomUser = getRandomUser(data);
    let privateInfo = getJSONSync(getRandomUserFileAddress(randomUser));
    let popularSeries = getJSONSync('../../data/popular-series.json');
    logUserPopularSeries(randomUser, privateInfo, popularSeries);
  }
  catch (err) {
    console.error(err);
  }
}

let aCoolAsyncScenario = awaitify(function* () {
  try {
    let data = yield getJSONAsync('../../data/users.json');
    let randomUser = getRandomUser(data);
    let privateInfo = yield getJSONAsync(getRandomUserFileAddress(randomUser));
    let popularSeries = yield getJSONAsync('../../data/popular-series.json');
    logUserPopularSeries(randomUser, privateInfo, popularSeries);
  }
  catch (e) {
    console.error(err);
  }
});

function getRandomUser(data) {
  return data[Math.floor(Math.random() * data.length)];
}

function getRandomUserFileAddress(randomUser) {
  return '../../data/' + randomUser.firstName.toLowerCase() + '-' + randomUser.lastName.toLowerCase() + '.json';
}


function logUserPopularSeries(user, privateInfo, popularSeries) {
  let birthYear = new Date(privateInfo.birthDate).getFullYear();
  console.log('User: ', user.firstName + ' ' + user.lastName);
  if (typeof popularSeries[birthYear] === 'undefined') {
    return console.log('WOW At your birthDate TV Series has not been invented yet! :) Just kidding data is not availble for :' + birthYear);
  }
  console.log('Birth year:', birthYear);
  console.log('Popular Series of this year was: "' + popularSeries[birthYear] + '"');
}

// callSync();
// callAsync();
// aWeirdScenarioInSync();
// aCoolAsyncScenario();


function testSyncSeries() {
  let startedAt = present();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('The control flow is DONE, how long it took:', present() - startedAt);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
}

function testParallel() {
  let startedAt = present();
  aCoolAsyncScenario();
  aCoolAsyncScenario();
  aCoolAsyncScenario();
  aCoolAsyncScenario();
  aCoolAsyncScenario();
  aCoolAsyncScenario();
  aCoolAsyncScenario();
  aCoolAsyncScenario();

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('The control flow is DONE, how long it took:', present() - startedAt);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
}

const testAsyncSeries = awaitify(function *() {
  let startedAt = present();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();

  // aCoolAsyncScenario();
  // aCoolAsyncScenario();
  // aCoolAsyncScenario();
  // aCoolAsyncScenario();
  // aCoolAsyncScenario();
  // aCoolAsyncScenario();
  // aCoolAsyncScenario();
  // aCoolAsyncScenario();

  // yield aCoolAsyncScenario();
  // yield aCoolAsyncScenario();
  // yield aCoolAsyncScenario();
  // yield aCoolAsyncScenario();
  // yield aCoolAsyncScenario();
  // yield aCoolAsyncScenario();
  // yield aCoolAsyncScenario();
  // yield aCoolAsyncScenario();

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('The control flow is DONE, how long it took:', present() - startedAt);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
});

// testSyncSeries();

testParallel();

// testAsyncSeries();