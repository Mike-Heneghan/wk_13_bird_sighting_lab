const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function (url) {
  this.url = url;
};

Sightings.prototype.bindEvents = function () {
  PubSub.subscribe('SightingView:sighting-delete-clicked', (evt) => {
    this.deleteSighting(evt.detail);
  });
  PubSub.subscribe('SightingFormView:submitted-sighting', (evt) => {
    this.addSighting(evt.detail);
  });
};

Sightings.prototype.getData = function () {
  const request = new Request(this.url);
  request.get()
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.deleteSighting = function (sightingId) {
  const request = new Request(this.url);
  request.delete(sightingId)
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.addSighting = function (sightingToPost) {
  const request = new Request(this.url);
  request.post(sightingToPost)
  .then((sightings) => {
    PubSub.publish('Sightings:data-loaded', sightings);
  })
  .catch(console.error);
};

module.exports = Sightings;
