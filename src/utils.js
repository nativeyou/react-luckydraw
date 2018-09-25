/**
 * 绘制自动换行的文本
 * @param {Obj} context
 * @param {Str} t          文本内容
 * @param {Num} x          坐标
 * @param {Num} y          坐标
 * @param {Num} w          文本限制宽度
 * @param {Num} lineHeight 行高
 */
export function drawText (context, t, x, y, w, lineHeight = 20) {
    let chr = t.split(''),
        temp = '',
        row = [];

    for (let a = 0; a < chr.length; a++){
        if ( context.measureText(temp).width < w ) {
            ;
        }
        else{
            row.push(temp);
            temp = '';
        }
        temp += chr[a];
    };

    row.push(temp);

    for(let b = 0; b < row.length; b++){
        context.fillText(row[b], x, y + (b + 1) * lineHeight);
    };
};

export function windowToCanvas (canvas, e) {
    const boundingReact = canvas.getBoundingClientRect(),
        x = e.clientX,
        y = e.clientY;

    return {
        x: x - boundingReact.left,
        y: y - boundingReact.top
    }
}