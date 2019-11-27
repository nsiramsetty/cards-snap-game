let testBlob = require('../../../../_data/testBlob');
import store from '../../../../_store';
import {initialState} from "../../../../_store/initialState";
import 'vue-range-component/dist/vue-range-slider.css';
import VueRangeSlider from 'vue-range-component';
import {
  MglAttributionControl,
  MglFullscreenControl,
  MglGeolocateControl,
  MglMap,
  MglMarker,
  MglNavigationControl,
  MglPopup,
  MglScaleControl
} from 'vue-mapbox';

export default {
  name: 'home',
  props: [],
  data: function () {
    return {
      buildno : process.env.BUILD_NO,
      featuresList: [...testBlob.features],
      accessToken: 'pk.eyJ1IjoibnNpcmFtc2V0dHkiLCJhIjoiY2sxeXF2ZmZjMHE5ZDNubXQwOWNiOXUxaCJ9.JrWqpd_aK4Ej-xFTygFohg', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      zoom: 14,
      filters: store.getters['filters'] ? store.getters['filters'] : {...initialState.filters},
      rangeFilters:{
        'Value' : {
          value: [Math.min(...[...testBlob.features].map(item => item.properties.project['Value'])), Math.max(...[...testBlob.features].map(item => item.properties.project['Value']))],
          min: Math.min(...[...testBlob.features].map(item => item.properties.project['Value'])),
          max: Math.max(...[...testBlob.features].map(item => item.properties.project['Value']))
        }
      }
    };
  },
  created: function () {
  },
  methods: {
    getListOfDropDownItems : function(key){
      return [...new Set(this.featuresList.map(item => item.properties.project[key]))];
    },
    resetFilters : function(){
      this.$set(this, 'filters', {...initialState.filters});
      this.$set(this.rangeFilters.Value, 'value', [this.rangeFilters.Value.min,this.rangeFilters.Value.max]);
      store.dispatch('CLEAR_ALL_DATA');
    }
  },
  computed: {
    center: function () {
      return this.filteredFeatures[0] ? this.filteredFeatures[0].geometry.coordinates : this.featuresList[0].geometry.coordinates
    },
    filteredFeatures: function () {
      return this.featuresList.filter((feature) => {
        return (
          (!this.filters.Category || feature.properties.project.Category === this.filters.Category)
          && (!this.filters.Type || feature.properties.project.Type === this.filters.Type)
          && (!this.filters.State || feature.properties.project.State === this.filters.State)
          && (!this.filters.Suburb || feature.properties.project.Suburb === this.filters.Suburb)
          && (!this.filters.Stage || feature.properties.project.Stage === this.filters.Stage)
          && (!this.filters.SubCategory || feature.properties.project.SubCategory === this.filters.SubCategory)
          && (!this.filters.Council || feature.properties.project.Council === this.filters.Council)
          && (!this.filters.Status || feature.properties.project.Status === this.filters.Status)
          && (!this.filters.Ownership || feature.properties.project.Ownership === this.filters.Ownership)
          && (parseInt(feature.properties.project.Value) >= this.rangeFilters['Value'].value[0] && parseInt(feature.properties.project.Value) <= this.rangeFilters['Value'].value[1])
        );
      });
    }
  },
  watch: {
    filters: {
      handler: function (newVal, oldVal) {
        store.dispatch('UPDATE_FILTERS', this.filters);
      },
      deep: true
    }
  },
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl,
    MglGeolocateControl,
    MglAttributionControl,
    MglScaleControl,
    MglFullscreenControl,
    MglPopup,
    VueRangeSlider
  }
}
