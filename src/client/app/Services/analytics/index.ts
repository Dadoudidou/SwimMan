import * as Analytics from "modules/analytics";

//chargement de la librairie
Analytics.loadLibrary();

//tracker par défaut
let _defaultTracker = new Analytics.Tracker("UA-105695679-1", {
    cookieDomain: "none"
});
_defaultTracker.create();


//plugins

/*import * as TrackClick from "modules/analytics/Plugins/TrackClick"
_defaultTracker.provide("TrackClick", TrackClick.TrackClick);

_defaultTracker.require("TrackClick", {
    element: document
} as TrackClick.ITrackClickOptions);*/

//request tracker
export const getTracker = () => _defaultTracker;



