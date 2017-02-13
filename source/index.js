/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Backend module prototype for oai-pmh-server
*
* Copyright (c) 2017 University Of Helsinki (The National Library Of Finland)
*
* This file is part of oai-pmh-server-backend-module-prototype
*
* oai-pmh-server-backend-module-prototype is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* oai-pmh-server-backend-module-prototype is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this file.
*
*/

/* eslint-disable no-unused-vars */

'use strict';

import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import

export const HARVESTING_GRANULARITY = {
	DATE: 0,
	DATETIME: 1
};
export const DELETED_RECORDS_SUPPORT = {
	NO: 0,
	TRANSIENT: 1,
	PERSISTENT: 2
};
export const ERRORS = {
	badArgument: 0,
	badResumptionToken: 1,
	badVerb: 2,
	cannotDisseminateFormat: 4,
	idDoesNotExist: 8,
	noRecordsMatch: 16,
	noMetadataFormats: 32,
	noSetHierarchy: 64
};
/**
* @type {metadataFormat}
*/
export const METADATA_FORMAT_DC = {
	prefix: 'oai_dc',
	schema: 'http://www.openarchives.org/OAI/2.0/oai_dc.xsd',
	namespace: 'http://www.openarchives.org/OAI/2.0/oai_dc/'
};
/**
* @typedef {number} error
* @desc A bit field consisting of {@link ERRORS} values
*/

/**
* @typedef {Object} metadataFormat
* @property {string} prefix
* @property {string} url
*/

/**
* @typedef {Object} set
* @property {string} spec
* @property {string} name
* @property {string} [description]
*/

/**
* @typedef {Object} flowControl
* @property {string} resumptionToken
* @property {Date} [expirationDate]
* @property {number} [completeListSize]
* @property {number} [cursor]
*/

/**
* @external {Document} https://developer.mozilla.org/en-US/docs/Web/API/Document
*/
/**
* @typedef {Object} record
* @property {string} identifier
* @property {Date} timestamp
* @property {boolean} [deleted]
* @property {Document} [metadata]
* @property {string[]} [setSpec] - An array of {@link set} specs
*/

/**
* @typedef {Object} getRecordsResponse
* @property {record[]} records - xxx
* @property {flowControl} [flowControl]
*/

/**
* @typedef {Object} getRecordsParameters
* @property {string} metadataPrefix - A {@link metadataFormat} prefix
* @property {Date} [from] - xxx
* @property {Date} [until] - xxx
* @property {string} [set] - A {@link set} spec
* @property {string} [resumptionToken] - Optional resumption token to get the next partition of records
*/

/**
* @typedef {Object} backendModule
* @property {getCapabilities} getCapabilities - Get capabilities of the backend module
* @property {getEarliestSupportedDate} getEarliestSupportedDate - Get the earliest date on which a record modification information is available
* @property {getSets} getSets - Get the sets the backend supports
* @property {getRecords} getRecords - xxx
* @property {getIdentifiers} getIdentifiers - xxx
* @property {getRecord} getRecord - xxx
*/

/**
* Factory function to create a backend module
* @param {Object} [options={}] - Implementation-specific options
* @returns {backendModule} Backend module
*/
export function factory(options = {}) {
	return Object.freeze({
		/**
		* Backend module specific capabilities
		* @typedef {Object} capabilities
		* @property {DELETED_RECORDS_SUPPORT} deletedRecordsSupport
		* @property {HARVESTING_GRANULARITY} harvestingGranularity
		*/
		/**
		* @typedef {function} getCapabilities
		* @returns {capabilities} Backend's capabilities
		*/
		getCapabilities: () => {
			return {
				deletedRecordsSupport: DELETED_RECORDS_SUPPORT.NO,
				harvestingGranularity: HARVESTING_GRANULARITY.DATE
			};
		},
		/**
		* @typedef {function} getEarliestSupportedDate
		* @returns {Promise<Date>} The earliest supported modification of a record
		*/
		getEarliestSupportedDate: () => {
			return Promise.resolve(new Date());
		},
		/**
		* @typedef {function} getRecord
		* @param {string} identifier - xxx
		* @param {string} metadataPrefix - xxx
		* @returns {Promise<record, number>} Resolves with a {@link record}
		*/
		getRecord: (identifier, metadataPrefix) => {
			return Promise.reject(ERRORS.idDoesNotExist);
		},
		/**
		* @typedef {function} getMetadataFormats
		* @param {string} [identifier] - xxxx
		* @returns {Promise<metadataFormat[], error>} All supported metadata formats or metadata formats available for a record specified by identifier
		*/
		getMetadataFormats: (identifier = undefined) => {
			return Promise.resolve([METADATA_FORMAT_DC]);
		},
		/**
		* @typedef {Object} getSetsResponse
		* @property {set[]} sets
		* @property {flowControl} [flowControl]
		*/
		/**
		* @typedef {function} getSets
		* @param {string} [resumptionToken] - Optional resumption token to get the next partition of records
		* @returns {Promise<getSetsResponse, error>} An array of sets
		*/
		getSets: (resumptionToken = undefined) => {
			return Promise.reject(resumptionToken ? ERRORS.badResumptionToken : ERRORS.noSetHierarchy);
		},
		/**
		* @typedef {function} getIdentifiers
		* @param {getRecordsParameters} parameters - xxx
		* @returns {Promise<getRecordsResponse, error>} Actual record metadata is not contained in the response
		*/
		getIdentifiers: parameters => {
			return Promise.reject(ERRORS.noRecordsMatch);
		},
		/**
		* @typedef {function} getRecords
		* @param {Object} parameters - xxx
		* @param {string} metadataPrefix - A {@link metadataFormat} prefix
		* @param {Date} [from] - xxx
		* @param {Date} [until] - xxx
		* @param {string} [set] - A {@link set} spec
		* @param {string} [resumptionToken] - Optional resumption token to get the next partition of records
		* @returns {Promise<getRecordsResponse, error>} An array of records
		*/
		getRecords: parameters => {
			return Promise.reject(ERRORS.noRecordsMatch);
		}
	});
}
