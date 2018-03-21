# Postcoder geocoding

Simple node wrapper for geocoding endpoints of the PostCoder Web API from Allies.

[Find out more about the geocoding API](https://www.alliescomputing.com/postcoder/geocoding) and [sign up for a trial to get an API key](https://www.alliescomputing.com/postcoder/sign-up)

**Note: This is a paid for API**

The API allows searching for forward and reverse UK geocoding.

[For full developer documentation](https://developers.alliescomputing.com)

## Install

`npm install postcoder-geocoding`

https://www.npmjs.com/package/postcoder-geocoding

### Basic usage

```javascript
var geocoding = require("postcoder-geocoding");

geocoding.init("[YOUR API KEY HERE]");

geocoding.geoFromPostcode("NR14 7PZ", function(result, error) {

    if (error) {
        console.log(error);
    } else {
        // returns an array of locations containing latitude and longitude
        console.log(result);
    }

});
```

### Check status of your API key

Returns an object with information about number of credits on your account and more

[Full list of fields returned](https://developers.alliescomputing.com/postcoder-web-api/error-handling)

```javascript
var address_lookup = require("postcoder-geocoding");

address_lookup.init("[YOUR API KEY HERE]");

address_lookup.checkStatus(function(result, error) {

    if (error) {
        console.log(error);
    } else {
        // returns an object with information about number of credits on your account and more
        console.log(result);
    }

});
```

### Note about support

This is a community supported package, maintained by [Stephen Keable](https://github.com/stephenkeable)
