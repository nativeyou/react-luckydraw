import React, {Component} from 'react';
import './App.css';
import LuckDraw from './LuckDraw';

class App extends Component {
    render() {
        return (
            <div className="App">
                <LuckDraw
                    outsideRadius={200}
                    awards={
                        [
                            {type: 'text', content: 'iphone8'},
                            {type: 'text', content: '大保健'},
                            {type: 'text', content: '10元话费'},
                            {type: 'image', content: 'https://img12.360buyimg.com/n7/jfs/t4807/209/1436278963/496606/8e486549/58f0884eNcec87657.jpg'},
                            {type: 'losing', content: '未中奖'}
                        ]
                    }
                />
            </div>
        );
    }
}

export default App;
