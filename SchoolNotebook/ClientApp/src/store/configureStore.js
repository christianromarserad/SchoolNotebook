import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Counter from './Counter';
import * as WeatherForecasts from './WeatherForecasts';
import * as User from './User';
import * as Bookmark from './Bookmark';
import * as ReminderNote from './ReminderNote';
import * as Notebook from './Notebook';
import * as NotebookContent from './NotebookContent';
import * as NotebookPage from './NotebookPage';
import * as NotebookComment from './NotebookComment';
import * as NotebookNavbar from './NotebookNavbar';

export default function configureStore (history, initialState) {
  const reducers = {
    user: User.reducer,
    homePage: combineReducers({
        bookmark: Bookmark.reducer,
        reminderNote: ReminderNote.reducer,
        notebook: Notebook.reducer
    }),
    notebookPage: combineReducers({
        notebookNavbar: NotebookNavbar.reducer,
        selectedNotebook: NotebookPage.reducer,
        notebookContent: NotebookContent.reducer,
        notebookComment: NotebookComment.reducer
    }),
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
