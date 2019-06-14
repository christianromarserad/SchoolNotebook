import React, { Component } from 'react';
import Bookmark from './home/Bookmark';
import ReminderNote from './home/ReminderNote';
import Notebook from './home/Notebook';

class Home extends Component {

    render() {
        return (
            <div>
                <Bookmark />
                <ReminderNote />
                <Notebook />
            </div>
        );
    }
}

export default Home;