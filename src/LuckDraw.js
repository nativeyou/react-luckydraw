import React from 'react';

export default class LuckDraw extends React.PureComponent {
    constructor(props){
        super(props);
        this.outsideRadius = props.outsideRadius;
        this.evenColor = props.evenColor || '#FF6766';
        this.oddColor = props.oddColor || '#FD5757';
        this.loseColor = props.loseColor || '#F79494';
        this.textColor = props.textColor || 'White';

        this.arrowColorFrom = props.arrowColorFrom || '#FFFC95';
        this.arrowColorTo = props.arrowColorTo || '#FF9D37';
        this.buttonFont = props.buttonFont || '开始抽奖';
        this.buttonFontColor = props.buttonFontColor || '#88411F';
        this.buttonColorFrom = props.buttonColorFrom || '#FDC964';
        this.buttonColorTo = props.buttonColorTo || '#FFCB65';

        this.startRadian = props.startRadian || 0;
        this.duration = props.duration || 4000;
        this.velocity = props.velocity || 10;

        this.INSIDE_RADIUS = 0;
        this.TEXT_RADIAS = this.outsideRadius * .8;
        this.FONT_STYLE = `bold ${this.outsideRadius * .07}px Helvetica, Arial`;

        this.ARROW_RADIUS = this.outsideRadius / 3;     // 圆盘指针的半径
        this.BUTTON_RADIUS = this.ARROW_RADIUS * .8;     // 圆盘内部按钮的半径

        this.AWARDS_COUNT = props.awards.length;
        this.AWARD_RADIAN = (Math.PI * 2) / this.AWARDS_COUNT;


        this.state = {
            awards: props.awards,
            _isAnimate: false,
            _spinningTime: 0,
            _spinTotalTime: 0,
            _spinningChange: 0,
            _canvasStyle: ''
        }
    }

    componentDidMount(){
        this.context = this.refs.canvas.getContext('2d');
        this.centerX = this.refs.canvas.width / 2;
        this.centerY = this.refs.canvas.height / 2;
        this.renderWheel(this.context);
    }

    renderWheel = (context) => {
        this._canvasStyle = this.refs.canvas.getAttribute('style');
        this.drawRouletteWheel(context);
    };

    drawRouletteWheel = () => {

    };

    finish = () => {
        this.props.finish && this.props.finish();
    };

    windowToCanvas = (canvas, e) => {
        const bbox = canvas.getBoundingClientRect(),
            x = this.IsPC() ? e.clientX || event.clientX : e.changedTouches[0].clientX,
            y = this.IsPC() ? e.clientY || event.clientY : e.changedTouches[0].clientY;

        return {
            x: x - bbox.left,
            y: y - bbox.top
        }
    };

    luckyDraw = (context) => {
        this._isAnimate = true;
        this.value = '';
        this._spinningTime = 0;
        this._spinTotalTime = Math.random() * 1000 + this.duration;
        this._spinningChange = Math.random() * 100 + this.velocity;
        this.rotateWheel(context);
    };

    touchStartHandle = (e) => {
        if(!this.state._isAnimate){
            const loc = this.windowToCanvas(this.props.canvas, e);
            this.context.beginPath();
            this.context.context.arc(this.centerX, this.centerY, this.BUTTON_RADIUS, 0, Math.PI * 2, false);
            if (context.isPointInPath(loc.x, loc.y)) {
                this.luckyDraw(context);
            }
        }
    };

    render(){
        return (
            <div>
                <canvas ref="canvas" width='375' height='375' onTouchStart={this.touchStartHandle}>
                    Canvas not supported
                </canvas>
            </div>
        )
    }
};