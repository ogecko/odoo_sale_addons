<template>
  <input
    class="form-control"
    autocomplete="new-password"
    type="text"
    :class="classname"
    :id="id"
    :placeholder="placeholder"
    v-model="value"
    @focus="fixChromeAutofillOff()"
  />
</template>


<script>
  /* global google */
  export default {
    props: {
      classname:            { type: String },
      placeholder:          { type: String, default: 'Start typing' },
      enableGeolocation:    { type: Boolean, default: false },
      geolocationOptions:   { type: Object, default: null }
    },

    data() {
      return {
        id:  null,
        googlePlacesWidget: null,
        value: '',
        valueLast: undefined,
        valueResult: {},
      }
    },
    computed: {
        isValidatedAddress() {
          return (this.value == this.valueLast);
        }
    },

    watch: {
        value: function (newVal) {
          this.$emit('input', newVal);
        },
    },

    mounted: function() {
      this.id = this._uid;
      const options = { 
        fields: [ 'types','geometry','address_components', 'formatted_address' ],
        componentRestrictions: { country: 'au' },
      };

      this.googlePlacesWidget = new google.maps.places.Autocomplete(this.$el, options);
      this.googlePlacesWidget.addListener('place_changed', this.onPlaceChanged);
    },

    methods: {
        /**
       * PROBLEM - Chromes autofill overlaps on the screen with GoogleMaps autocomplete! 
       * Setting the <INPUT autocomplete="off" no longer works in Chrome to prevent autofill
       * Need to set <INPUT autocomplete="new-password" to prevent Chrome autofill
       * Unfortunately GoogleMaps resets autocomplete to "off"
       * This focus hack is needed to ensure it stays set to "new-password"
       */
      fixChromeAutofillOff() {
        this.$el.setAttribute('autocomplete', 'new-password');
      },
      /**
       * When a place changed (user selected one, pressed enter key, or place details failes)
       */
      onPlaceChanged() {
        let place = this.googlePlacesWidget.getPlace();

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          this.valueResult = undefined;
          this.$emit('address-not-found', place, this.id);
          return;
        }

        if (place.address_components !== undefined) {
          // User has selected a correct address, update the field, the results and emit
          this.value = this.$el.value;
          this.valueLast = this.$el.value;
          this.valueResult = this.formatResult(place);
          this.$emit('address-changed', this.valueResult, place, this.id);
        }
      },

      /**
       * When the input gets focus
       */
      onFocus() {
        this.fixChromeAutofillOff()
      },


      /**
       * Format result from Geo google APIs
       * @param place
       * @returns {{formatted output}}
       */
      formatResult (place) {
        const ADDRESS_COMPONENTS = {
          subpremise : ['short_name', 'subpremise'],
          street_number: ['short_name', 'street_number'],
          route: ['long_name', 'street_name'],
          locality: ['long_name', 'city'],
          postal_code: ['short_name', 'postcode'],
          administrative_area_level_1: ['short_name', 'state'],
          administrative_area_level_2: ['long_name', 'council'],
          country: ['long_name', 'country'],
        };

        let returnData = {};
        for (let i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0];

          if (ADDRESS_COMPONENTS[addressType]) {
            const placeField = ADDRESS_COMPONENTS[addressType][0];
            const resultField = ADDRESS_COMPONENTS[addressType][1];
            const val = place.address_components[i][placeField];
            returnData[resultField] = val;
          }
        }

        returnData['latitude'] = place.geometry.location.lat();
        returnData['longitude'] = place.geometry.location.lng();
        returnData['types'] = place.types.join(', ');
        returnData['address'] = place.formatted_address;

        return returnData
      },

    }
  }
</script>