'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getStatusForInput = exports.getStatusForInput = function getStatusForInput(_ref) {
    var input = _ref.input,
        matchingReferences = _ref.matchingReferences,
        referenceRecord = _ref.referenceRecord,
        _ref$translate = _ref.translate,
        translate = _ref$translate === undefined ? function (x) {
        return x;
    } : _ref$translate;

    var matchingReferencesError = matchingReferences && matchingReferences.error ? translate(matchingReferences.error, {
        _: matchingReferences.error
    }) : null;
    var selectedReferenceError = input.value && !referenceRecord ? translate('ra.input.references.single_missing', {
        _: 'ra.input.references.single_missing'
    }) : null;

    return {
        waiting: input.value && selectedReferenceError && !matchingReferences || !input.value && !matchingReferences,
        error: input.value && selectedReferenceError && matchingReferencesError || !input.value && matchingReferencesError ? input.value ? selectedReferenceError : matchingReferencesError : null,
        warning: selectedReferenceError || matchingReferencesError,
        choices: Array.isArray(matchingReferences) ? matchingReferences : [referenceRecord].filter(function (choice) {
            return choice;
        })
    };
};

var REFERENCES_STATUS_READY = exports.REFERENCES_STATUS_READY = 'REFERENCES_STATUS_READY';
var REFERENCES_STATUS_INCOMPLETE = exports.REFERENCES_STATUS_INCOMPLETE = 'REFERENCES_STATUS_INCOMPLETE';
var REFERENCES_STATUS_EMPTY = exports.REFERENCES_STATUS_EMPTY = 'REFERENCES_STATUS_EMPTY';

var getSelectedReferencesStatus = exports.getSelectedReferencesStatus = function getSelectedReferencesStatus(input, referenceRecords) {
    return !input.value || input.value.length === referenceRecords.length ? REFERENCES_STATUS_READY : referenceRecords.length > 0 ? REFERENCES_STATUS_INCOMPLETE : REFERENCES_STATUS_EMPTY;
};

var getStatusForArrayInput = exports.getStatusForArrayInput = function getStatusForArrayInput(_ref2) {
    var input = _ref2.input,
        matchingReferences = _ref2.matchingReferences,
        referenceRecords = _ref2.referenceRecords,
        _ref2$translate = _ref2.translate,
        translate = _ref2$translate === undefined ? function (x) {
        return x;
    } : _ref2$translate;

    // selectedReferencesData can be "empty" (no data was found for references from input.value)
    // or "incomplete" (Not all of the reference data was found)
    // or "ready" (all references data was found or there is no references from input.value)
    var selectedReferencesData = getSelectedReferencesStatus(input, referenceRecords);

    var matchingReferencesError = matchingReferences && matchingReferences.error ? translate(matchingReferences.error, {
        _: matchingReferences.error
    }) : null;

    return {
        waiting: !matchingReferences && input.value && selectedReferencesData === REFERENCES_STATUS_EMPTY || !matchingReferences && !input.value,
        error: matchingReferencesError && (!input.value || input.value && selectedReferencesData === REFERENCES_STATUS_EMPTY) ? translate('ra.input.references.all_missing', {
            _: 'ra.input.references.all_missing'
        }) : null,
        warning: matchingReferencesError || input.value && selectedReferencesData !== REFERENCES_STATUS_READY ? matchingReferencesError || translate('ra.input.references.many_missing', {
            _: 'ra.input.references.many_missing'
        }) : null,
        choices: Array.isArray(matchingReferences) ? matchingReferences : referenceRecords
    };
};