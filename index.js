"use strict";

var request = require('request');
var qs = require('qs');

/*

Create instance and basic default options

*/

var AlliesGeocoding = function () {
    
    if (!(this instanceof AlliesGeocoding)) {
        
        return new AlliesGeocoding();
    }
    
    var config = {
        url_base: "https://ws.postcoder.com/pcw/",
        page_num: 0,
        options: {
            category: "places",
        }
    };
    
    this.config = config;
    
}

/*

Init function

Sets up API key (required, will default to Test key if not supplied)

Optional

Options object which is turned into query string parameters
Debug use true to check search key against status service and console.log the result

*/

AlliesGeocoding.prototype.init = function (api_key, options, debug) {
    
    if (typeof api_key === "string") {
        this.config.api_key = api_key;
    } else {
        this.config.api_key = "PCW45-12345-12345-1234X";
    }
    
    var new_options = options || false;
    
    if (new_options) {
        this.setOptions(new_options);
    }
    
    this.config.debug = debug || false;
    
    if (this.config.debug === true) {
    
        this.checkStatus(function(response, error) {

            if(error) {
                
                console.log(error);   
                
            } else {
            
                console.log(response);
            }
        });
        
    }
    
};

/*

Overwrite the options object after init

*/

AlliesGeocoding.prototype.setOptions = function (object) {
   this.config.options = object; 
};

/*

Overwrite the page_num

*/

AlliesGeocoding.prototype.setPageNum = function (page_num) {
    if(typeof page_num == "number") {
        this.config.page_num = parseInt(page_num, 10); 
    }
};

/*

Status endpoint give information about number of credits available amongst others

*/

AlliesGeocoding.prototype.checkStatus = function (callback) {
  
    var request_url = this.config.url_base + this.config.api_key + "/status";
    
    send_request(request_url, function(result, error) {

        return callback(result, error);
        
    });
    
};


/*

Return the geodata for a given postcode

*/

AlliesGeocoding.prototype.geoFromPostcode = function (search, callback) {
  
    var request_url = this.config.url_base + this.config.api_key + "/position/UK/" + encodeURIComponent(search) + "?" + qs.stringify(this.config.options);
    
    send_request(request_url, function(result, error) {

        return callback(result, error);
        
    });
    
};


/*

Return the street name(s) along with geodata for a given postcode

*/

AlliesGeocoding.prototype.searchStreetGeo = function (search, callback) {
  
    var request_url = this.config.url_base + this.config.api_key + "/geo/UK/" + encodeURIComponent(search) + "?" + qs.stringify(this.config.options);
    
    send_request(request_url, function(result, error) {

        return callback(result, error);
        
    });
    
};


/*

Return the nearest streets for given latitude and longitude, within radius (metres)

*/

AlliesGeocoding.prototype.streetFromGeo = function (latitude, longitude, radius, callback) {
    
    var radius = radius || 50;
    var latitude = latitude || false;
    var longitude = longitude || false;
    
    if(trim_check(latitude) !== false && trim_check(longitude) !== false) {
  
        var request_url = this.config.url_base + this.config.api_key + "/rgeo/UK/" + encodeURIComponent(latitude) + "/" + encodeURIComponent(longitude) + "?distance=" + encodeURIComponent(radius) + "&" + qs.stringify(this.config.options);

        send_request(request_url, function(result, error) {

            return callback(result, error);

        });
        
    } else {
        
        var error_response = {
            http_status: 404,
            error_body: "No latitude or/and longitude parameter supplied"
        };
        
        return callback(false, error_response);
    }
    
};


/*

Return geodata for a given IP address

*/

AlliesGeocoding.prototype.geoFromIp = function (ip_address, callback) {
    
    var ip_address = ip_address || false;
    
    if(ip_address !== false && ip_address.trim() != "") {
  
        var request_url = this.config.url_base + this.config.api_key + "/geolocate/ip/" + encodeURIComponent(ip_address) + "?" + qs.stringify(this.config.options);

        send_request(request_url, function(result, error) {

            return callback(result, error);

        });
        
    } else {
        
        var error_response = {
            http_status: 404,
            error_body: "No IP Address parameter supplied"
        };
        
        return callback(false, error_response);
        
    }
    
};


/*

Search for place name and return geodata along with other information

*/

AlliesGeocoding.prototype.searchPlaceName = function (place_name, callback) {
      
    var request_url = this.config.url_base + this.config.api_key + "/placenames/GB/" + encodeURIComponent(place_name) + "?" + qs.stringify(this.config.options);

    send_request(request_url, function(result, error) {

        return callback(result, error);

    });
    
};


/*

Return geodata and other info for a single Place Name using ID

*/

AlliesGeocoding.prototype.getSinglePlaceName = function (place_id, callback) {
    
    var place_id = place_id || false;
    
    if(trim_check(place_id) !== false) {
      
        var request_url = this.config.url_base + this.config.api_key + "/placenames/GB/id?id=" + encodeURIComponent(place_id) + "&" + qs.stringify(this.config.options);

        send_request(request_url, function(result, error) {

            return callback(result, error);

        });
        
    } else {
        
        var error_response = {
            http_status: 404,
            error_body: "No Place ID parameter supplied"
        };
        
        return callback(false, error_response);
        
    }
    
};

/* 

Internal helper functions

*/

function send_request(request_url, callback) {
    
    // Could probably get rid of dependency on the 'request' library to be honest
    
    request(request_url, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            // Convert response into a JSON object
            var status_response = JSON.parse(body);
            
            return callback(status_response, false);
            
        } else {
            if (error) {
            
                return callback(false, error);
                
            } else {
                
                var error_response = {
                    http_status: response.statusCode,
                    error_body: body
                };
            
                return callback(false, error_response);
            }

        }

    });
    
}

function trim_check(text) {
    
    if(text === false) {
        return false;
    } else if (text.trim() == "") {
        return false;
    } else {
        return true
    }
    
}

module.exports = new AlliesGeocoding();