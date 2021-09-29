const express = require('express');

const morgan = require('morgan');

// const parseProduct = require('../parsingScripts/parseProduct');
// const parseFeatures = require('../parsingScripts/parseFeatures');
// const parseStyles = require('../parsingScripts/parseStyles');
// const parsePhotos = require('../parsingScripts/parsePhotos');
// const parseSkus = require('../parsingScripts/parseSkus');
// const parseRelated = require('../parsingScripts/parseRelated');

// const reshapedRelated = require('../parsingScripts/reshapeRelated');

// const combineProductAndRelated = require('../parsingScripts/combineProductAndRelated');

const parseCombinedProductsAndRelated = require('../parsingScripts/parseCombinedProductAndRelated');

const server = express();
const routes = require('./routes');

server.use(morgan('dev'));
server.use(express.json());
server.use('/', routes);

module.exports = server;
