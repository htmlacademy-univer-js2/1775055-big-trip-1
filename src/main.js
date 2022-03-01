import {createTripMenu} from './view/menu-view.js';
import {createTripFilter} from './view/filter-view.js';
import {createTripContent} from './view/list-view.js';
import {createTripSort} from './view/sort-view.js';
import {createTripAddNewPoint} from './view/add-new-point-view.js';
import {createTripEditPoint} from './view/edit-point-view.js';
import {renderTemplate, RenderPosition} from './render.js';

const siteHeader = document.querySelector('.page-header');
const siteNavigationElement = siteHeader.querySelector('.trip-controls__navigation');

renderTemplate(siteNavigationElement, createTripMenu(), RenderPosition.BEFOREEND);

const siteFilterElement = siteHeader.querySelector('.trip-controls__filters');

renderTemplate(siteFilterElement, createTripFilter(), RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.page-main');
const siteMainElement = siteMain.querySelector('.page-body__container');

renderTemplate(siteMainElement, createTripSort(), RenderPosition.BEFOREEND);

renderTemplate(siteMainElement, createTripContent(), RenderPosition.BEFOREEND);

const siteList = document.querySelector('.trip-events__list');

renderTemplate(siteList, createTripAddNewPoint(), RenderPosition.AFTERBEGIN);

renderTemplate(siteList, createTripEditPoint(), RenderPosition.AFTERBEGIN);

