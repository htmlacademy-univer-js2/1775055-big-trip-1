/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mock/event.js":
/*!***************************!*\
  !*** ./src/mock/event.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateEvents": () => (/* binding */ generateEvents)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.dev.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _utils_date_manipulation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/date-manipulation.js */ "./src/utils/date-manipulation.js");
/* eslint-disable no-unused-vars */




let allOffersPrice = 0;
const typeRoutes = [{
  title: 'Taxi',
  img: 'img/icons/taxi.png'
}, {
  title: 'Bus',
  img: 'img/icons/bus.png'
}, {
  title: 'Drive',
  img: 'img/icons/drive.png'
}, {
  title: 'Check-in',
  img: 'img/icons/check-in.png'
}, {
  title: 'Flight',
  img: 'img/icons/flight.png'
}, {
  title: 'Restaurant',
  img: 'img/icons/restaurant.png'
}, {
  title: 'Sightseeing',
  img: 'img/icons/sightseeing.png'
}, {
  title: 'Train',
  img: 'img/icons/train.png'
}];
const cityes = ['Amsterdam', 'Geneva', 'Chamonix'];

const generateDate = () => {
  const maxDaysGag = 7;
  const daysGap = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(0, maxDaysGag);
  const daysAddition = daysGap + (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(0, 2);
  const startHoursAddition = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(1, 6);
  const endHoursAddition = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(startHoursAddition, startHoursAddition + 10);
  const startMinutesAddition = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(0, 59);
  const endMinutesAddition = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(startMinutesAddition, startMinutesAddition + 59);
  return {
    'dataBeginEvent': dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(daysGap, 'day').add(startHoursAddition, 'hour').add(startMinutesAddition, 'minute').toDate(),
    'dataEndEvent': dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(daysAddition, 'day').add(endHoursAddition, 'hour').add(endMinutesAddition, 'minute').toDate()
  };
};

const generateTime = date => {
  const dateBegin = new Date('', dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('M'), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('D'), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('H'), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('m'));
  const dateEnd = new Date('', dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataEndEvent).format('M'), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataEndEvent).format('D'), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataEndEvent).format('H'), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataEndEvent).format('m'));
  const duration = (0,_utils_date_manipulation_js__WEBPACK_IMPORTED_MODULE_2__.getDiffDates)(dateBegin, dateEnd);
  let durationFormat = '';

  if (duration.days !== 0) {
    durationFormat += `${`0${duration.days}`.slice(-2)}D ${`0${duration.hours}`.slice(-2)}H ${`0${duration.minuts}`.slice(-2)}M`;
  } else if (duration.hours !== 0) {
    durationFormat += `${`0${duration.hours}`.slice(-2)}H ${`0${duration.minuts}`.slice(-2)}M`;
  } else {
    durationFormat += `${`0${duration.minuts}`.slice(-2)}M`;
  }

  return {
    'startTime': `${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('HH')}:${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('mm')}`,
    'endTime': `${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataEndEvent).format('HH')}:${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataEndEvent).format('mm')}`,
    'duration': durationFormat,
    'arrayDurationFormat': duration
  };
};

const generateDescription = () => {
  const descriptionArray = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('.');
  const countDescription = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(1, descriptionArray.length);
  let description = '';

  for (let i = 0; i < countDescription; i++) {
    const elementNumber = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(0, descriptionArray.length - 1);
    const descriptionArrayElement = descriptionArray[elementNumber];
    descriptionArray.splice(elementNumber, 1);
    description += descriptionArrayElement;
  }

  return description;
};

const generateOffers = () => {
  const offersTitleArray = [{
    'text': 'Add luggage',
    'id': 'luggage'
  }, {
    'text': 'Switch to comfort',
    'id': 'comfort'
  }, {
    'text': 'Add meal',
    'id': 'meal'
  }, {
    'text': 'Choose seats',
    'id': 'seats'
  }, {
    'text': 'Travel by train',
    'id': 'train'
  }];
  const countOffers = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(0, 5);
  const offersArray = [];

  for (let i = 0; i < countOffers; i++) {
    const numberElement = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(0, offersTitleArray.length - 1);
    const offerTitleArray = offersTitleArray[numberElement];
    offersTitleArray.splice(numberElement, 1);
    const offer = {
      title: offerTitleArray,
      price: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(10, 100)
    };
    allOffersPrice += offer.price;
    offersArray.push(offer);
  }

  return offersArray;
};

const generatePhoto = () => {
  const photos = [];
  let numberPhoto = 0;
  const countPhotos = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(3, 6);

  for (let i = 0; i < countPhotos; i++) {
    numberPhoto += (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(1, 10);
    photos.push(`http://picsum.photos/248/152?r=${numberPhoto}`);
  }

  return photos;
};

const generateEvents = () => {
  const date = generateDate();
  const time = generateTime(date);
  const offers = generateOffers();
  const allPrice = allOffersPrice + (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(10, 30);
  const type = typeRoutes[(0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(0, 7)];
  allOffersPrice = 0;
  return {
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_3__.nanoid)(),
    date,
    type,
    city: cityes[(0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(0, 2)],
    time,
    offers,
    description: generateDescription(),
    allPrice,
    favorite: Boolean((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(0, 1)),
    photos: generatePhoto()
  };
};



/***/ }),

/***/ "./src/presentor/event-presenter.js":
/*!******************************************!*\
  !*** ./src/presentor/event-presenter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventPresenter)
/* harmony export */ });
/* harmony import */ var _view_item_event_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/item-event-view.js */ "./src/view/item-event-view.js");
/* harmony import */ var _view_edit_point_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/edit-point-view.js */ "./src/view/edit-point-view.js");
/* harmony import */ var _view_offer_edit_and_new_point_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/offer-edit-and-new-point.js */ "./src/view/offer-edit-and-new-point.js");
/* harmony import */ var _view_event_offer_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/event-offer-view.js */ "./src/view/event-offer-view.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

var _eventListContainer = /*#__PURE__*/new WeakMap();

var _changeData = /*#__PURE__*/new WeakMap();

var _changeMode = /*#__PURE__*/new WeakMap();

var _eventComponent = /*#__PURE__*/new WeakMap();

var _eventEditComponent = /*#__PURE__*/new WeakMap();

var _tripEvent = /*#__PURE__*/new WeakMap();

var _mode = /*#__PURE__*/new WeakMap();

var _removeOfferElements = /*#__PURE__*/new WeakMap();

var _onEscKeyDown = /*#__PURE__*/new WeakMap();

var _replaceEventToEditPoint = /*#__PURE__*/new WeakMap();

var _replaceEditPointToEvent = /*#__PURE__*/new WeakMap();

var _renderOffers = /*#__PURE__*/new WeakMap();

var _handleFavoriteClick = /*#__PURE__*/new WeakMap();

class EventPresenter {
  constructor(eventListContainer, changeData, changeMode) {
    _classPrivateFieldInitSpec(this, _eventListContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _changeData, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _changeMode, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _eventComponent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _eventEditComponent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _tripEvent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _mode, {
      writable: true,
      value: Mode.DEFAULT
    });

    _defineProperty(this, "init", tripEvent => {
      _classPrivateFieldSet(this, _tripEvent, tripEvent);

      const prevEventComponent = _classPrivateFieldGet(this, _eventComponent);

      const prevEventEditComponent = _classPrivateFieldGet(this, _eventEditComponent);

      _classPrivateFieldSet(this, _eventComponent, new _view_item_event_view_js__WEBPACK_IMPORTED_MODULE_0__["default"](_classPrivateFieldGet(this, _tripEvent)));

      _classPrivateFieldSet(this, _eventEditComponent, new _view_edit_point_view_js__WEBPACK_IMPORTED_MODULE_1__["default"](_classPrivateFieldGet(this, _tripEvent)));

      _classPrivateFieldGet(this, _eventComponent).setClickRollupHandler(_classPrivateFieldGet(this, _replaceEventToEditPoint));

      _classPrivateFieldGet(this, _eventEditComponent).setClickRollupHandler(_classPrivateFieldGet(this, _replaceEditPointToEvent));

      _classPrivateFieldGet(this, _eventEditComponent).setFormSubmitHadler(_classPrivateFieldGet(this, _replaceEditPointToEvent));

      _classPrivateFieldGet(this, _eventComponent).setFavoriteClickHandler(_classPrivateFieldGet(this, _handleFavoriteClick));

      if (prevEventComponent === null || prevEventEditComponent === null) {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(_classPrivateFieldGet(this, _eventListContainer), _classPrivateFieldGet(this, _eventComponent), _render_js__WEBPACK_IMPORTED_MODULE_4__.RenderPosition.BEFOREEND);

        _classPrivateFieldGet(this, _renderOffers).call(this);

        return;
      }

      if (_classPrivateFieldGet(this, _mode) === Mode.DEFAULT) {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.replace)(_classPrivateFieldGet(this, _eventComponent), prevEventComponent);

        _classPrivateFieldGet(this, _renderOffers).call(this);
      }

      if (_classPrivateFieldGet(this, _mode) === Mode.EDITING) {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.replace)(_classPrivateFieldGet(this, _eventEditComponent), prevEventEditComponent);
      }

      (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.remove)(prevEventComponent);
      (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.remove)(prevEventEditComponent);
    });

    _defineProperty(this, "resetView", () => {
      if (_classPrivateFieldGet(this, _mode) !== Mode.DEFAULT) {
        _classPrivateFieldGet(this, _replaceEditPointToEvent).call(this);
      }
    });

    _defineProperty(this, "destroy", () => {
      (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.remove)(_classPrivateFieldGet(this, _eventComponent));
      (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.remove)(_classPrivateFieldGet(this, _eventEditComponent));
    });

    _classPrivateFieldInitSpec(this, _removeOfferElements, {
      writable: true,
      value: () => {
        const offersElement = _classPrivateFieldGet(this, _eventEditComponent).element.querySelectorAll('.event__offer-selector');

        offersElement.forEach(offer => offer.remove());
      }
    });

    _classPrivateFieldInitSpec(this, _onEscKeyDown, {
      writable: true,
      value: evt => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();

          _classPrivateFieldGet(this, _replaceEditPointToEvent).call(this);

          document.removeEventListener('keydown', _classPrivateFieldGet(this, _onEscKeyDown));
        }
      }
    });

    _classPrivateFieldInitSpec(this, _replaceEventToEditPoint, {
      writable: true,
      value: () => {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.replace)(_classPrivateFieldGet(this, _eventEditComponent), _classPrivateFieldGet(this, _eventComponent));

        const availableOffers = _classPrivateFieldGet(this, _eventEditComponent).element.querySelector('.event__available-offers');

        _classPrivateFieldGet(this, _tripEvent).offers.forEach(offer => (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(availableOffers, new _view_offer_edit_and_new_point_js__WEBPACK_IMPORTED_MODULE_2__["default"](offer), _render_js__WEBPACK_IMPORTED_MODULE_4__.RenderPosition.BEFOREEND));

        _classPrivateFieldGet(this, _changeMode).call(this);

        _classPrivateFieldSet(this, _mode, Mode.EDITING);

        document.addEventListener('keydown', _classPrivateFieldGet(this, _onEscKeyDown));
      }
    });

    _classPrivateFieldInitSpec(this, _replaceEditPointToEvent, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _removeOfferElements).call(this);

        (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.replace)(_classPrivateFieldGet(this, _eventComponent), _classPrivateFieldGet(this, _eventEditComponent));
        document.removeEventListener('keydown', _classPrivateFieldGet(this, _onEscKeyDown));

        _classPrivateFieldSet(this, _mode, Mode.DEFAULT);
      }
    });

    _classPrivateFieldInitSpec(this, _renderOffers, {
      writable: true,
      value: () => {
        const selectedOffers = _classPrivateFieldGet(this, _eventComponent).element.querySelector('.event__selected-offers');

        _classPrivateFieldGet(this, _tripEvent).offers.forEach(offer => (0,_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(selectedOffers, new _view_event_offer_view_js__WEBPACK_IMPORTED_MODULE_3__["default"](offer), _render_js__WEBPACK_IMPORTED_MODULE_4__.RenderPosition.BEFOREEND));
      }
    });

    _classPrivateFieldInitSpec(this, _handleFavoriteClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _changeData).call(this, { ..._classPrivateFieldGet(this, _tripEvent),
          favorite: !_classPrivateFieldGet(this, _tripEvent).favorite
        });
      }
    });

    _classPrivateFieldSet(this, _eventListContainer, eventListContainer);

    _classPrivateFieldSet(this, _changeData, changeData);

    _classPrivateFieldSet(this, _changeMode, changeMode);
  }

}

/***/ }),

/***/ "./src/presentor/trip-presenter.js":
/*!*****************************************!*\
  !*** ./src/presentor/trip-presenter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripPresenter)
/* harmony export */ });
/* harmony import */ var _view_menu_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/menu-view */ "./src/view/menu-view.js");
/* harmony import */ var _view_filter_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/filter-view.js */ "./src/view/filter-view.js");
/* harmony import */ var _view_list_event_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/list-event-view.js */ "./src/view/list-event-view.js");
/* harmony import */ var _view_sort_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/sort-view.js */ "./src/view/sort-view.js");
/* harmony import */ var _view_event_empty_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/event-empty.js */ "./src/view/event-empty.js");
/* harmony import */ var _event_presenter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./event-presenter.js */ "./src/presentor/event-presenter.js");
/* harmony import */ var _utils_sorting_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/sorting.js */ "./src/utils/sorting.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }











var _tripContainer = /*#__PURE__*/new WeakMap();

var _menuContainer = /*#__PURE__*/new WeakMap();

var _filterContainer = /*#__PURE__*/new WeakMap();

var _tripEvents = /*#__PURE__*/new WeakMap();

var _eventPresenters = /*#__PURE__*/new WeakMap();

var _currentSortType = /*#__PURE__*/new WeakMap();

var _menuComponent = /*#__PURE__*/new WeakMap();

var _filterComponent = /*#__PURE__*/new WeakMap();

var _sortComponent = /*#__PURE__*/new WeakMap();

var _listEventComponent = /*#__PURE__*/new WeakMap();

var _eventEmptyComponent = /*#__PURE__*/new WeakMap();

var _handleModeChange = /*#__PURE__*/new WeakMap();

var _handleEventChange = /*#__PURE__*/new WeakMap();

var _sortTasks = /*#__PURE__*/new WeakMap();

var _renderSort = /*#__PURE__*/new WeakMap();

var _renderListEvent = /*#__PURE__*/new WeakMap();

var _handleSortTypeChange = /*#__PURE__*/new WeakMap();

var _renderEvent = /*#__PURE__*/new WeakMap();

var _renderEvents = /*#__PURE__*/new WeakMap();

var _clearEventList = /*#__PURE__*/new WeakMap();

var _renderNoEvents = /*#__PURE__*/new WeakMap();

var _renderBoard = /*#__PURE__*/new WeakMap();

class TripPresenter {
  constructor(tripContainer, menuContainer, filterContainer) {
    _classPrivateFieldInitSpec(this, _tripContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _menuContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filterContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _tripEvents, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _eventPresenters, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _currentSortType, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _menuComponent, {
      writable: true,
      value: new _view_menu_view__WEBPACK_IMPORTED_MODULE_0__["default"]()
    });

    _classPrivateFieldInitSpec(this, _filterComponent, {
      writable: true,
      value: new _view_filter_view_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
    });

    _classPrivateFieldInitSpec(this, _sortComponent, {
      writable: true,
      value: new _view_sort_view_js__WEBPACK_IMPORTED_MODULE_3__["default"]()
    });

    _classPrivateFieldInitSpec(this, _listEventComponent, {
      writable: true,
      value: new _view_list_event_view_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
    });

    _classPrivateFieldInitSpec(this, _eventEmptyComponent, {
      writable: true,
      value: new _view_event_empty_js__WEBPACK_IMPORTED_MODULE_4__["default"]()
    });

    _defineProperty(this, "init", tripEvents => {
      _classPrivateFieldSet(this, _tripEvents, [...tripEvents]);

      (0,_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(_classPrivateFieldGet(this, _menuContainer), _classPrivateFieldGet(this, _menuComponent), _render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);
      (0,_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(_classPrivateFieldGet(this, _filterContainer), _classPrivateFieldGet(this, _filterComponent), _render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);

      _classPrivateFieldGet(this, _renderBoard).call(this);
    });

    _classPrivateFieldInitSpec(this, _handleModeChange, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _eventPresenters).forEach(eventPresenter => eventPresenter.resetView());
      }
    });

    _classPrivateFieldInitSpec(this, _handleEventChange, {
      writable: true,
      value: updatedEvent => {
        _classPrivateFieldSet(this, _tripEvents, (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_7__.updateItem)(_classPrivateFieldGet(this, _tripEvents), updatedEvent));

        _classPrivateFieldGet(this, _eventPresenters).get(updatedEvent.id).init(updatedEvent);
      }
    });

    _classPrivateFieldInitSpec(this, _sortTasks, {
      writable: true,
      value: sortType => {
        // 2. Этот исходный массив задач необходим,
        // потому что для сортировки мы будем мутировать
        // массив в свойстве _boardTasks
        switch (sortType) {
          case _utils_sorting_js__WEBPACK_IMPORTED_MODULE_6__.SortType.DAY.text:
            _classPrivateFieldGet(this, _tripEvents).sort(_utils_sorting_js__WEBPACK_IMPORTED_MODULE_6__.sortEventDate);

            break;

          case _utils_sorting_js__WEBPACK_IMPORTED_MODULE_6__.SortType.TIME.text:
            _classPrivateFieldGet(this, _tripEvents).sort(_utils_sorting_js__WEBPACK_IMPORTED_MODULE_6__.sortEventTime);

            break;

          case _utils_sorting_js__WEBPACK_IMPORTED_MODULE_6__.SortType.PRICE.text:
            _classPrivateFieldGet(this, _tripEvents).sort(_utils_sorting_js__WEBPACK_IMPORTED_MODULE_6__.sortEventPrice);

            break;
        }

        _classPrivateFieldSet(this, _currentSortType, sortType);
      }
    });

    _classPrivateFieldInitSpec(this, _renderSort, {
      writable: true,
      value: () => {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(_classPrivateFieldGet(this, _tripContainer), _classPrivateFieldGet(this, _sortComponent), _render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);

        _classPrivateFieldGet(this, _sortComponent).setSortTypeChangeHandler(_classPrivateFieldGet(this, _handleSortTypeChange));
      }
    });

    _classPrivateFieldInitSpec(this, _renderListEvent, {
      writable: true,
      value: () => {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(_classPrivateFieldGet(this, _tripContainer), _classPrivateFieldGet(this, _listEventComponent), _render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);
      }
    });

    _classPrivateFieldInitSpec(this, _handleSortTypeChange, {
      writable: true,
      value: sortType => {
        // - Сортируем задачи
        if (_classPrivateFieldGet(this, _currentSortType) === sortType) {
          return;
        }

        _classPrivateFieldGet(this, _sortTasks).call(this, sortType);

        _classPrivateFieldGet(this, _clearEventList).call(this);

        _classPrivateFieldGet(this, _renderListEvent).call(this);

        _classPrivateFieldGet(this, _renderEvents).call(this); // - Очищаем список
        // - Рендерим список заново

      }
    });

    _classPrivateFieldInitSpec(this, _renderEvent, {
      writable: true,
      value: tripEvent => {
        const eventPresenter = new _event_presenter_js__WEBPACK_IMPORTED_MODULE_5__["default"](_classPrivateFieldGet(this, _listEventComponent), _classPrivateFieldGet(this, _handleEventChange), _classPrivateFieldGet(this, _handleModeChange));
        eventPresenter.init(tripEvent);

        _classPrivateFieldGet(this, _eventPresenters).set(tripEvent.id, eventPresenter);
      }
    });

    _classPrivateFieldInitSpec(this, _renderEvents, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _tripEvents).forEach(tripEvent => _classPrivateFieldGet(this, _renderEvent).call(this, tripEvent));
      }
    });

    _classPrivateFieldInitSpec(this, _clearEventList, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _eventPresenters).forEach(eventPresenter => eventPresenter.destroy());

        _classPrivateFieldGet(this, _eventPresenters).clear();
      }
    });

    _classPrivateFieldInitSpec(this, _renderNoEvents, {
      writable: true,
      value: () => {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_8__.render)(_classPrivateFieldGet(this, _tripContainer), _classPrivateFieldGet(this, _eventEmptyComponent), _render_js__WEBPACK_IMPORTED_MODULE_8__.RenderPosition.BEFOREEND);

        _classPrivateFieldGet(this, _listEventComponent).element.remove();

        _classPrivateFieldGet(this, _sortComponent).element.remove();
      }
    });

    _classPrivateFieldInitSpec(this, _renderBoard, {
      writable: true,
      value: () => {
        if (_classPrivateFieldGet(this, _tripEvents).length === 0) {
          _classPrivateFieldGet(this, _renderNoEvents).call(this);

          return;
        }

        _classPrivateFieldGet(this, _renderSort).call(this);

        _classPrivateFieldGet(this, _renderListEvent).call(this);

        _classPrivateFieldGet(this, _renderEvents).call(this);

        _classPrivateFieldGet(this, _handleSortTypeChange).call(this, 'day');
      }
    });

    _classPrivateFieldSet(this, _tripContainer, tripContainer);

    _classPrivateFieldSet(this, _menuContainer, menuContainer);

    _classPrivateFieldSet(this, _filterContainer, filterContainer);
  }

}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/abstract-view.js */ "./src/view/abstract-view.js");

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};
const render = (container, element, place) => {
  const parent = container instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? container.element : container;
  const child = element instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? element.element : element;

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;

    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;

    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;

    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};
const createElement = template => {
  const newElement = document.createElement('div'); // 1

  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};
const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? newElement.element : newElement;
  const oldChild = oldElement instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? oldElement.element : oldElement;
  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};
const remove = component => {
  if (component === null) {
    return;
  }

  if (!(component instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomNumber": () => (/* binding */ getRandomNumber),
/* harmony export */   "updateItem": () => (/* binding */ updateItem)
/* harmony export */ });
const getRandomNumber = (firstNumber, secondNumber) => {
  const maxNumber = Math.max(firstNumber, secondNumber);
  const minNumber = Math.min(firstNumber, secondNumber);
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};

const updateItem = (items, update) => {
  const index = items.findIndex(item => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};



/***/ }),

/***/ "./src/utils/date-manipulation.js":
/*!****************************************!*\
  !*** ./src/utils/date-manipulation.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDiffDates": () => (/* binding */ getDiffDates)
/* harmony export */ });
const getDiffDates = (dayOne, dayTwo) => {
  const diffDateUnix = Math.abs(dayOne - dayTwo);
  const days = Math.floor(diffDateUnix / (24 * 60 * 60 * 1000));
  const hours = Math.floor(diffDateUnix / (60 * 60 * 1000) - 24 * days);
  const minuts = diffDateUnix / (60 * 1000) - days * 24 * 60 - hours * 60;
  return {
    'days': days,
    'hours': hours,
    'minuts': minuts,
    'unix': diffDateUnix
  };
};



/***/ }),

/***/ "./src/utils/sorting.js":
/*!******************************!*\
  !*** ./src/utils/sorting.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortEventDate": () => (/* binding */ sortEventDate),
/* harmony export */   "sortEventTime": () => (/* binding */ sortEventTime),
/* harmony export */   "sortEventPrice": () => (/* binding */ sortEventPrice),
/* harmony export */   "SortType": () => (/* binding */ SortType)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);

const SortType = {
  DAY: {
    text: 'day',
    checked: true
  },
  TIME: {
    text: 'time',
    checked: false
  },
  PRICE: {
    text: 'price',
    checked: false
  }
};

const sortEventDate = (taskA, taskB) => {
  return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(taskA.date.dataBeginEvent).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(taskB.date.dataBeginEvent));
};

const sortEventTime = (taskA, taskB) => {
  const timeOne = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(taskA.date.dataEndEvent).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(taskA.date.dataBeginEvent));
  const timeTwo = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(taskB.date.dataEndEvent).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(taskB.date.dataBeginEvent));
  return timeOne - timeTwo;
};

const sortEventPrice = (taskA, taskB) => {
  return taskA.allPrice - taskB.allPrice;
};



/***/ }),

/***/ "./src/view/abstract-view.js":
/*!***********************************!*\
  !*** ./src/view/abstract-view.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _element = /*#__PURE__*/new WeakMap();

class AbstractView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _defineProperty(this, "_callback", {});

    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/edit-point-view.js":
/*!*************************************!*\
  !*** ./src/view/edit-point-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditPoint)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




const createTripEditPoint = event => {
  const {
    date,
    type,
    city,
    description
  } = event;
  const dataBeginEvent = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('YY/MM/DD HH:mm');
  const dataEndEvent = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataEndEvent).format('YY/MM/DD HH:mm');
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="${type.img}" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type.title}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dataBeginEvent}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dataEndEvent}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">

        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
      </section>
    </section>
  </form>
</li>`;
};

var _editPoint = /*#__PURE__*/new WeakMap();

var _clickHandler = /*#__PURE__*/new WeakMap();

var _formSubmitHandler = /*#__PURE__*/new WeakMap();

class EditPoint extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(editPoint) {
    super();

    _classPrivateFieldInitSpec(this, _editPoint, {
      writable: true,
      value: null
    });

    _defineProperty(this, "setClickRollupHandler", callback => {
      this._callback.click = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', _classPrivateFieldGet(this, _clickHandler));
    });

    _defineProperty(this, "setFormSubmitHadler", callback => {
      this._callback.formSubmit = callback;
      this.element.querySelector('.event').addEventListener('submit', _classPrivateFieldGet(this, _formSubmitHandler));
    });

    _classPrivateFieldInitSpec(this, _clickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.click();
      }
    });

    _classPrivateFieldInitSpec(this, _formSubmitHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.formSubmit();
      }
    });

    _classPrivateFieldSet(this, _editPoint, editPoint);
  }

  get template() {
    return createTripEditPoint(_classPrivateFieldGet(this, _editPoint));
  }

}

/***/ }),

/***/ "./src/view/event-empty.js":
/*!*********************************!*\
  !*** ./src/view/event-empty.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventEmpty)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");


const createEventEmpty = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

class EventEmpty extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createEventEmpty();
  }

}

/***/ }),

/***/ "./src/view/event-offer-view.js":
/*!**************************************!*\
  !*** ./src/view/event-offer-view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventOffer)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const createTripEventOffer = offer => {
  const {
    title,
    price
  } = offer;
  return `<li class="event__offer">
  <span class="event__offer-title">${title.text}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;
};

var _eventOffer = /*#__PURE__*/new WeakMap();

class EventOffer extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(eventOffer) {
    super();

    _classPrivateFieldInitSpec(this, _eventOffer, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _eventOffer, eventOffer);
  }

  get template() {
    return createTripEventOffer(_classPrivateFieldGet(this, _eventOffer));
  }

}

/***/ }),

/***/ "./src/view/filter-view.js":
/*!*********************************!*\
  !*** ./src/view/filter-view.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");


const createTripFilter = () => `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;

class FilterView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createTripFilter();
  }

}

/***/ }),

/***/ "./src/view/item-event-view.js":
/*!*************************************!*\
  !*** ./src/view/item-event-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventView)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




const createTripEvent = event => {
  const {
    date,
    type,
    city,
    allPrice,
    favorite,
    time
  } = event;
  const dataDayMonth = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('D MMM');
  let favoriteClass = '';
  const title = type.title;
  const img = type.img;

  if (favorite === true) {
    favoriteClass = 'event__favorite-btn--active';
  }

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${dataDayMonth}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="${img}" alt="Event type icon">
    </div>
    <h3 class="event__title">${title} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${time.startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${time.endTime}</time>
      </p>
      <p class="event__duration">${time.duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${allPrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">

    </ul>
    <button class="event__favorite-btn ${favoriteClass}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

var _events = /*#__PURE__*/new WeakMap();

var _favoriteClickHandler = /*#__PURE__*/new WeakMap();

var _clickHandler = /*#__PURE__*/new WeakMap();

class EventView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(event) {
    super();

    _classPrivateFieldInitSpec(this, _events, {
      writable: true,
      value: null
    });

    _defineProperty(this, "setClickRollupHandler", callback => {
      this._callback.click = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', _classPrivateFieldGet(this, _clickHandler));
    });

    _defineProperty(this, "setFavoriteClickHandler", callback => {
      this._callback.favoriteClick = callback;
      this.element.querySelector('.event__favorite-btn').addEventListener('click', _classPrivateFieldGet(this, _favoriteClickHandler));
    });

    _classPrivateFieldInitSpec(this, _favoriteClickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.favoriteClick();
      }
    });

    _classPrivateFieldInitSpec(this, _clickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.click();
      }
    });

    _classPrivateFieldSet(this, _events, event);
  }

  get template() {
    return createTripEvent(_classPrivateFieldGet(this, _events));
  }

}

/***/ }),

/***/ "./src/view/list-event-view.js":
/*!*************************************!*\
  !*** ./src/view/list-event-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ListEventView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");


const createTripListEvents = () => `<ul class="trip-events__list">

  </ul>`;

class ListEventView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createTripListEvents();
  }

}

/***/ }),

/***/ "./src/view/menu-view.js":
/*!*******************************!*\
  !*** ./src/view/menu-view.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MenuView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");


const createTripMenu = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`;

class MenuView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createTripMenu();
  }

}

/***/ }),

/***/ "./src/view/offer-edit-and-new-point.js":
/*!**********************************************!*\
  !*** ./src/view/offer-edit-and-new-point.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferForEditAndNewPoint)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const createOfferForEditAndNewPoint = offer => {
  const {
    title,
    price
  } = offer;
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.id}-1" type="checkbox" name="event-offer-${title.id}">
  <label class="event__offer-label" for="event-offer-${title.id}-1">
    <span class="event__offer-title">${title.text}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};

var _editAndNewPoint = /*#__PURE__*/new WeakMap();

class OfferForEditAndNewPoint extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(editAndNewPoint) {
    super();

    _classPrivateFieldInitSpec(this, _editAndNewPoint, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _editAndNewPoint, editAndNewPoint);
  }

  get template() {
    return createOfferForEditAndNewPoint(_classPrivateFieldGet(this, _editAndNewPoint));
  }

}

/***/ }),

/***/ "./src/view/sort-view.js":
/*!*******************************!*\
  !*** ./src/view/sort-view.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
/* harmony import */ var _utils_sorting_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sorting.js */ "./src/utils/sorting.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }




const createTripSort = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${_utils_sorting_js__WEBPACK_IMPORTED_MODULE_1__.SortType.DAY.text}" checked>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${_utils_sorting_js__WEBPACK_IMPORTED_MODULE_1__.SortType.TIME.text}">
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${_utils_sorting_js__WEBPACK_IMPORTED_MODULE_1__.SortType.PRICE.text}">
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;

var _sortTypeChangeHandler = /*#__PURE__*/new WeakMap();

class SortView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "setSortTypeChangeHandler", callback => {
      this._callback.sortTypeChange = callback;
      this.element.querySelectorAll('.trip-sort__input').forEach(elementSort => elementSort.addEventListener('click', _classPrivateFieldGet(this, _sortTypeChangeHandler)));
    });

    _classPrivateFieldInitSpec(this, _sortTypeChangeHandler, {
      writable: true,
      value: evt => {
        if (evt.target.checked === true) {
          this._callback.sortTypeChange(evt.target.dataset.sortType);
        }
      }
    });
  }

  get template() {
    return createTripSort();
  }

}

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),

/***/ "./node_modules/nanoid/index.dev.js":
/*!******************************************!*\
  !*** ./node_modules/nanoid/index.dev.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet),
/* harmony export */   "random": () => (/* binding */ random)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

if (true) {
  if (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative' &&
    typeof crypto === 'undefined'
  ) {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
        'For secure IDs, import `react-native-get-random-values` ' +
        'before Nano ID.'
    )
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error(
      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +
        ' before importing Nano ID to fix IE 11 support'
    )
  }
  if (typeof crypto === 'undefined') {
    throw new Error(
      'Your browser does not have secure random generator. ' +
        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}
let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, size, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * size) / alphabet.length)
  return () => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    let byte = bytes[size] & 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}



/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mock_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mock/event.js */ "./src/mock/event.js");
/* harmony import */ var _presentor_trip_presenter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presentor/trip-presenter.js */ "./src/presentor/trip-presenter.js");


const eventsCount = 5;
const events = Array.from({
  length: eventsCount
}, _mock_event_js__WEBPACK_IMPORTED_MODULE_0__.generateEvents);
const siteNavigationElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripPresenter = new _presentor_trip_presenter_js__WEBPACK_IMPORTED_MODULE_1__["default"](tripEvents, siteNavigationElement, siteFilterElement);
tripPresenter.init(events);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map