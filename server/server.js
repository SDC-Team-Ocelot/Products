const express = require('express');
const morgan = require('morgan');
const path = require('path');

const LOADER_PATH = path.resolve(__dirname, '..', 'loaderio-4554a4aec17a29992dfc07ce533e11ab.txt');

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
server.use('/loaderio-4554a4aec17a29992dfc07ce533e11ab.txt', express.static(LOADER_PATH));
module.exports = server;
