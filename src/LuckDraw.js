import React from 'react';
import * as utils from './utils';

export default class LuckDraw extends React.PureComponent {
    constructor(props){
        super(props);
        this.outsideRadius = 200;  // 半径
        this.offsetRadian = (Math.PI * 2) / props.awards.length; // 每一个奖品的偏转弧度
        this.BUTTON_RADIUS = this.outsideRadius / 3 * .8;
        
        this.state = {
            awards: props.awards
        }
    }

    componentDidMount(){
        this.context = this.refs.canvas.getContext('2d');
        this.centerX = this.refs.canvas.width / 2;
        this.centerY = this.refs.canvas.height / 2;
        this.drawRouletteWheel();
    }

    /**
     * 绘制表盘
     */
    drawRouletteWheel(){
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.save();
        // ------ 绘制圆盘
        const rgb = '#FD5757'.replace('#', ''),
            r = parseInt(rgb[0] + rgb[1], 16),
            g = parseInt(rgb[2] + rgb[3], 16),
            b = parseInt(rgb[4] + rgb[5], 16);
        this.context.fillStyle = `rgba(${r}, ${g}, ${b}, .72)`;
        // this.context.fillStyle = `#333`;
        this.context.shadowColor = 'rgba(0, 0, 0, .24)';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 5;
        this.context.shadowBlur = 15;
        this.context.arc(this.centerX, this.centerY, this.outsideRadius, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.restore();
        // ------

        // ------ 根据奖品数绘制内容
        const awards = this.state.awards;
        for(let i = 0; i < awards.length; i++) {
            this.context.save();
            
            // ------ 绘制奖品弧度
            this.context.fillStyle = awards[i].backgroundColor;
            const _startRadian = 1.5 * Math.PI + this.offsetRadian * i,
                _endRadian = _startRadian + this.offsetRadian;
            this.context.beginPath();
            this.context.arc(this.centerX, this.centerY, this.outsideRadius - 5, _startRadian, _endRadian, false);
            this.context.arc(this.centerX, this.centerY, 0, _endRadian, _startRadian, true);
            this.context.fill();
            this.context.restore();
            // ------

            // 绘制文案
            const content = awards[i].content;
            this.context.save();
            this.context.fillStyle = '#ffffff';
            this.context.font = `bold ${this.outsideRadius * .07}px Helvetica, Arial`;
            const textX = this.centerX + Math.cos(_startRadian + this.offsetRadian / 2) * this.outsideRadius * .8,
                textY = this.centerY + Math.sin(_startRadian + this.offsetRadian / 2) * this.outsideRadius * .8;
            this.context.translate(textX, textY);
            this.context.rotate(_startRadian + this.offsetRadian / 2 + Math.PI / 2);
            this.context.fillText(content, - this.context.measureText(content).width / 2, 0)
            this.context.restore();
        }
        // ------

        // ------ 绘制指针 左
        const moveX = this.centerX,
            moveY = this.centerY - this.outsideRadius / 3 + 5;
        this.context.save();
        this.context.fillStyle = '#FFFC95';
        this.context.beginPath();
        this.context.moveTo(moveX, moveY);
        this.context.lineTo(moveX - 15, moveY);
        this.context.lineTo(moveX, moveY - 30);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
        // ------

        // ------ 绘制指针 右
        this.context.save();
        this.context.fillStyle = '#FF9D37';
        this.context.beginPath();
        this.context.moveTo(moveX, moveY);
        this.context.lineTo(moveX + 15, moveY);
        this.context.lineTo(moveX, moveY - 30);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
        // ------

        // ------ 绘制圆盘
        const gradientBg = this.context.createLinearGradient(
            this.centerX - this.outsideRadius / 3, this.centerY - this.outsideRadius / 3,
            this.centerX - this.outsideRadius / 3, this.centerY + this.outsideRadius / 3
        );
        this.context.save();
        gradientBg.addColorStop(0, '#FFFC95');
        gradientBg.addColorStop(1, '#FF9D37');
        this.context.fillStyle = gradientBg;

        this.context.shadowColor = 'rgba(0, 0, 0, .12)';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 5;
        this.context.shadowBlur = 15;

        this.context.beginPath();
        this.context.arc(this.centerX, this.centerY, this.outsideRadius / 3, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.restore();
        // ------

        // ------ 绘制按钮
        const gradientBtn = this.context.createLinearGradient(
            this.centerX - this.BUTTON_RADIUS, this.centerY - this.BUTTON_RADIUS,
            this.centerX - this.BUTTON_RADIUS, this.centerY + this.BUTTON_RADIUS
        );
        this.context.save();
        gradientBtn.addColorStop(0, '#FDC964');
        gradientBtn.addColorStop(1, '#FFCB65');
        this.context.fillStyle = gradientBtn;

        this.context.beginPath();
        this.context.arc(this.centerX, this.centerY, this.BUTTON_RADIUS, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.restore();
        // ------

        // ------ 绘制文字
        this.context.save();
        this.context.fillStyle = '#88411F';
        this.context.font = `bold ${this.BUTTON_RADIUS / 2}px helvetica`;
        utils.drawText(
            this.context, 
            '开始抽奖',
            this.centerX - this.BUTTON_RADIUS / 2,
            this.centerY - this.BUTTON_RADIUS / 2 - 4,
            this.BUTTON_RADIUS * .8,
            this.BUTTON_RADIUS / 2 + 4

        );
        // ------
        this.context.restore();
    }

    mouseMoveHandle = (e) => {
        const loc = utils.windowToCanvas(this.refs.canvas, e);
        this.context.beginPath();
        this.context.arc(this.centerX, this.centerY, this.BUTTON_RADIUS, 0, Math.PI * 2, false);
        if(this.context.isPointInPath(loc.x, loc.y)) {
            this.refs.canvas.setAttribute('style', `cursor: pointer;`)
        } else {
            this.refs.canvas.setAttribute('style', '')
        }
    };

    beginRotateHandle = () => {

    };

    render(){
        return (
            <div>
                <canvas
                    ref="canvas"
                    width='500'
                    height='500'
                    onMouseMove={this.mouseMoveHandle}
                    onTouchStart={this.beginRotateHandle}
                    onMouseDown={this.beginRotateHandle}
                >
                    Canvas not supported
                </canvas>
            </div>
        )
    }
};