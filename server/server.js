const express = require('express');
const morgan = require('morgan');
const path = require('path');

const LOADER_PATH = path.resolve(__dirname, '..', 'loaderio-4c9a8638b1421446b6c5801c39d17c99.txt');

// const parseProduct = require('../parsingScripts/parseProduct');
// const parseFeatures = require('../parsingScripts/parseFeatures');
// const parseStyles = require('../parsingScripts/parseStyles');
// const parsePhotos = require('../parsingScripts/parsePhotos');
// const parseSkus = require('../parsingScripts/parseSkus');
// const parseRelated = require('../parsingScripts/parseRelated');

// const reshapedRelated = require('../parsingScripts/reshapeRelated');
// const combineProductAndRelated = require('../parsingScripts/combineProductAndRelated');
// const parseCombinedProductsAndRelated = require('../parsingScripts/parseCombinedProductAndRelated');

// const reshapeFeatures = require('../parsingScripts/reshapeFeatures');
// const combineProductAndFeatures = require('../parsingScripts/combineProductAndFeatures');
// const parseCombinedProductsAndFeatures = require('../parsingScripts/parseCombinedProductsAndFeatures');

const server = express();
const routes = require('./routes');

server.use(morgan('dev'));
server.use(express.json());
server.use('/', routes);
server.use('/loaderio-4c9a8638b1421446b6c5801c39d17c99.txt', express.static(LOADER_PATH));
module.exports = server;
