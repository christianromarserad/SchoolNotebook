import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Notebook from './components/Notebook/NotebookPage';
import NotebookSearch from './components/Notebook/NotebookSearch';
import LoginPage from './components/LoginPage';
import Authenticate from './components/Authenticate';
import BookmarkListPage from './components/Bookmark/BookmarkListPage';
import ReminderNoteListPage from './components/ReminderNote/ReminderNoteListPage';
import NotebookListPage from './components/Notebook/NotebookListPage';

export default () => (
    <div>
        <Authenticate>
            <Layout>
                <Route exact path='/' component={HomePage} />
                <Route path='/notebook/*/:id(\d+)' component={Notebook} />
                <Route path='/notebookSearch/:searchKey' component={NotebookSearch} />
                <Route path='/bookmark' component={BookmarkListPage} />
                <Route path='/reminderNote' component={ReminderNoteListPage} />
                <Route exact path='/notebook' component={NotebookListPage} />
            </Layout>
        </Authenticate>
        <Route exact path='/login' component={LoginPage} />
    </div>
);
