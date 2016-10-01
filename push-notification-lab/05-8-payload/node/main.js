/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var webPush = require('web-push');

// TODO 6 - generate VAPID keys

var subscriptionJSONString = process.argv.slice(2);

var subscription = JSON.parse(subscriptionJSONString);

webPush.setGCMAPIKey('AIzaSyD1JcZ8WM1vTtH6Y0tXq_Pnuw4jgj_92yg');

webPush.sendNotification(subscription.endpoint, {
  userPublicKey: subscription.keys.p256dh,
  userAuth: subscription.keys.auth,

  // TODO 7 - add VAPID object

  payload: JSON.stringify({
    'title': 'First push message!',
    'body': 'From a server!',
    'primaryKey': '-push-notification'
  })
})
.then(function(r) {
  console.log('Pushed message successfully!', r);
})
.catch(function(e) {
  console.log('Error', e);
});