
export interface ITrackClickOptions {
    element?: NodeSelector & EventTarget & Node
    selector?: string
    live?: boolean
}

export interface ITrackerElement {
    element: NodeSelector & EventTarget & Node,
    selector?: string
    live: boolean
}

export class TrackClick{

    _elements: EventTarget[]
    _trackerElement: ITrackerElement
    _tracker: any

    constructor(tracker, options: ITrackClickOptions){
        this._listener = this._listener.bind(this);
        this._liveObserver = this._liveObserver.bind(this);
        this._attachElements = this._attachElements.bind(this);
        this._detachElements = this._detachElements.bind(this);

        this._tracker = tracker;
        this._trackerElement = {
            element: options.element || document,
            selector: options.selector,
            live: (options.live) ? true : false
        }
        this._detachElements(this._elements);
        this._elements = [];
        if (this._trackerElement.live) {
            
            let observer = new MutationObserver(this._liveObserver);
            observer.observe(this._trackerElement.element, { childList: true, subtree: true });

        } else {
            
            this._elements = this._queryElements(this._trackerElement);
            this._attachElements(this._elements);
        }
    }

    private _queryElements(trackerElement: ITrackerElement) {
        let _elements = [];
        if (trackerElement.selector) {
            let __elements = trackerElement.element.querySelectorAll(trackerElement.selector);
            for (let i = 0; i < __elements.length; i++)
                _elements.push(__elements.item(i));
        }
        if (_elements.length == 0) _elements.push(trackerElement.element);
        return _elements;
    }

    private _attachElements(elements: EventTarget[]) {
        if (elements == undefined) return;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].addEventListener)
                elements[i].addEventListener("click", this._listener, true);
        }
    }

    private _detachElements(elements: EventTarget[]) {
        if (elements == undefined) return;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].removeEventListener)
                elements[i].removeEventListener("click", this._listener, true);
        }
    }

    private _liveObserver(mutations: MutationRecord[]) {
        this._detachElements(this._elements);
        this._elements = this._queryElements(this._trackerElement);
        this._attachElements(this._elements);
    }

    private _getHtml(event: MouseEvent) {
        let _elementHtml = undefined;
        let _target = event.target as Element;
        if (_target.cloneNode) {
            let _ghostDiv = document.createElement("div");
            _ghostDiv.appendChild(_target.cloneNode(false));
            _elementHtml = _ghostDiv.innerHTML;
            if (_ghostDiv.remove) _ghostDiv.remove();
            else if (_ghostDiv.parentNode) _ghostDiv.parentNode.removeChild(_ghostDiv);
        }
        return _elementHtml;
    }

    private _listener(event: MouseEvent) {
        //console.log("[TrackerClick]", event.target);
        this._tracker.send("event", "user", "click", event.pageX + ":" + event.pageY);
    }
}
