import React, {Component} from 'react';
import './App.css';
import LuckDraw from './LuckDraw';

class App extends Component {
    render() {
        return (
            <div className="App">
                <LuckDraw
                    awards = {
                        [
                            {type: 'text', content: '10积分', backgroundColor: '#FF6766'},
                            {type: 'text', content: '25积分', backgroundColor: '#FD5757'},
                            {type: 'text', content: '5积分', backgroundColor: '#FF6766'},
                            {type: 'text', content: '100积分', backgroundColor: '#FD5757'},
                            {type: 'text', content: '200积分', backgroundColor: '#FF6766'},
                            {type: 'text', content: '500积分', backgroundColor: '#FD5757'},
                            {type: 'losed', content: '未抽中', backgroundColor: '#F79494'}
                        ]
                    }
                />
            </div>
        );
    }
}

export default App;
