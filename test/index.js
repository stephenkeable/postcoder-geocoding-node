"use strict";

var assert = require('assert');

describe('AlliesGeocoding', function() {
   
    describe('.init()',function() {
        
        it("Should default to the test key, when no key passed", function() {
       
            var geocoding = require("../");
            geocoding.init();
            
            assert.equal("PCW45-12345-12345-1234X", geocoding.config.api_key);
            
        });
        
        it("Should default to the test key, when non string passed", function() {
       
            var geocoding = require("../");
            geocoding.init(3);
            
            assert.equal(geocoding.config.api_key, "PCW45-12345-12345-1234X");
            
        });
        
        it("Should use the key passed when is string", function() {
       
            var geocoding = require("../");
            geocoding.init("ABC45-56789-12345-1234X");
            
            assert.equal(geocoding.config.api_key, "ABC45-56789-12345-1234X");
            
        });
        
        it("Should use the default this.config.options object", function() {
       
            var geocoding = require("../");
            
            geocoding.init("ABC45-56789-12345-1234X");
            
            assert.equal(geocoding.config.options.category, "places");
            
        });
        
        it("Should overwrite this.config.options object when one supplied", function() {
       
            var geocoding = require("../");
            
            var options = {
                category: "streets"
            }
            
            geocoding.init("ABC45-56789-12345-1234X", options);
            
            assert.equal(geocoding.config.options.category, "streets");
            
        });
        
        it("Should console.log info about api_key being used when passing true in third parameter");
        
    });
    
    describe('.setOptions()',function() {
       
        it("Should overwrite this.config.options object when one supplied", function() {
       
            var geocoding = require("../");
            
            var options = {
                lines: 4,
                addtags: "udprn"
            }
            
            geocoding.init();
            
            geocoding.setOptions(options);
            
            assert.equal(geocoding.config.options.lines, 4);
            assert.equal(geocoding.config.options.addtags, "udprn");
            
        });
        
    });
    
    describe('.setPageNum()',function() {
       
        it("Should NOT overwrite this.config.page_num value when non number supplied", function() {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.setPageNum("garbage");
            
            assert.equal(geocoding.config.page_num, 0);
            
        });
       
        it("Should overwrite this.config.page_num value when integer supplied", function() {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.setPageNum(1);
            
            assert.equal(geocoding.config.page_num, 1);
            
        });
       
        it("Should overwrite this.config.page_num value when non integer number supplied (converts using parseint)", function() {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.setPageNum(1.3);
            
            assert.equal(geocoding.config.page_num, 1);
            
        });
       
        it("Should overwrite this.config.page_num value when 0 supplied", function() {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.setPageNum(0);
            
            assert.equal(geocoding.config.page_num, 0);
            
        });
        
    });
    
    describe('.checkStatus()',function() {
       
        it("Should return result object and false for error.", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.checkStatus( function(result, error) {
            
                assert.equal(typeof result, "object");
                assert.equal(error, false);
                
                done();
                
            });
            
        });
       
        it("Should fail when can't reach API, needs way of simulating broken connection");
        
        it("Should inform you when using test key", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.checkStatus( function(result, error) {
            
                assert.equal(result.state, "Test Key");
                assert.equal(result.correctsearchkey, true);
                
                done();
                
            });
            
        });
       
        it("Should inform you when using incorrect key", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init("rsetghtdejgkfk");
            
            geocoding.checkStatus( function(result, error) {
            
                assert.equal(result.state, "Incorrect Search Key");
                assert.equal(result.correctsearchkey, false);
                
                done();
                
            });
            
        });
        
    });
    
    describe('.geoFromPostcode()',function() {
        
        it("Should return result array with one record with latitude and longitude fields for NR14 7PZ", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.geoFromPostcode("NR14 7PZ", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length == 1, true);
                assert.equal(result[0].latitude != 'undefined', true);
                assert.equal(result[0].longitude != 'undefined', true);
                
                done();
                
            });
            
        });
       
        it("Should return empty array with blank search parameter", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.geoFromPostcode("", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length, 0);
                
                done();
                
            });
            
        });
        
    });
    
    describe('.searchStreetGeo()',function() {
        
        it("Should return result array with one record for NR14 7PZ", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.searchStreetGeo("NR14 7PZ", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length == 1, true);
                
                done();
                
            });
            
        });
       
        it("Should return empty array with blank search parameter", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.searchStreetGeo("", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length, 0);
                
                done();
                
            });
            
        });
       
        it("Should include latitude and longitude fields in first record", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.searchStreetGeo("NR14 7PZ", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length == 1, true);
                assert.equal(result[0].latitude != 'undefined', true);
                assert.equal(result[0].longitude != 'undefined', true);
                
                done();
                
            });
            
        });
    });
    
    describe('.streetFromGeo()',function() {
        
    });
    
    describe('.geoFromIp()',function() {
        
        it("Should return result object geodata fields for 82.71.8.24", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.geoFromIp("82.71.8.24", function(result, error) {
            
                assert.equal(typeof result, "object");
                assert.equal(result.countryname, "United Kingdom");
                assert.equal(result.iso2code, "GB");
                assert.equal(result.latitude, "51.5");
                assert.equal(result.longitude, "-0.13");
                
                done();
                
            });
            
        });
       
        it("Should return error.http_code=404 for blank IP address parameter", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.geoFromIp("", function(result, error) {
            
                assert.equal(error.http_status, 404);
                
                done();
                
            });
            
        });
        
    });
    
    describe('.searchPlaceName()',function() {
        
        it("Should return result array for Framingham Pigot", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.searchPlaceName("Framingham Pigot", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length > 1, true);
                
                done();
                
            });
            
        });
       
        it("Should return empty array with blank search parameter", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.searchPlaceName("", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length, 0);
                
                done();
                
            });
            
        });
        
        it("Should return result array with single record for Framingham Pigot and category=places", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            var options = {
                category: "places"
            };
            
            geocoding.setOptions(options);
            
            geocoding.searchPlaceName("Framingham Pigot", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length == 1, true);
                
                done();
                
            });
            
        });
        
        it("Should return result array for Framingham Pigot and category=streets, with first record name=Pigot Lane", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            var options = {
                category: "streets"
            };
            
            geocoding.setOptions(options);
            
            geocoding.searchPlaceName("Framingham Pigot", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length > 1, true);
                assert.equal(result[0].name, "Pigot Lane");
                
                done();
                
            });
            
        });
        
    });
    
    describe('.getSinglePlaceName()',function() {
        
        it("Should return result array with single record for id=osgb4000000074572958", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.getSinglePlaceName("osgb4000000074572958", function(result, error) {
            
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length == 1, true);
                
                done();
                
            });
            
        });
       
        it("Should return error.http_code=404 for blank ID parameter", function(done) {
       
            var geocoding = require("../");
            
            geocoding.init();
            
            geocoding.getSinglePlaceName("", function(result, error) {
            
                assert.equal(error.http_status, 404);
                
                done();
                
            });
            
        });
        
    });
    
});