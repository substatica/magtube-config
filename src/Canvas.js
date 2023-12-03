import React, {useState, useRef, useEffect } from 'react'

const Canvas = props => {
    const [MagTubeConfig, setMagTubeConfig] = useState({
        StockPivotAngles: props.StockPivotAngles,
        CheekRestHeight: props.CheekRestHeight,
        CupPivotAngles: props.CupPivotAngles,
        CupOffsets: props.CupOffsets,
        StrapMountOffsets: props.StrapMountOffsets,
        ForceTube: props.ForceTube,
        StockSegementLengths: [
            175,
            175,
            175
        ],
        CupPositions: [
            { 
                X: 0,
                Y: 0,
            },
            { 
                X: 0,
                Y: 0,
            }, 
        ],
        StockSegmentPositions: [
            { 
                X: 35,
                Y: 150
            },
            { 
                X: 0,
                Y: 0,
            },
            { 
                X: 0,
                Y: 0,
            }
        ],
    });

    const canvasRef = useRef(null)

    const downloadImage = () => {
        var link = document.createElement('a');
        link.download = 'MagTubeConfiguration.png';
        link.href = canvasRef.current.toDataURL()
        link.click();
    }

    useEffect(() => {
        const drawRect = (ctx, x1, y1, w1, h1, fill = 'white') => {
            ctx.beginPath();
            ctx.strokeStyle = fill;
            ctx.fillStyle = fill;
            ctx.roundRect(x1, y1, w1, h1, 10);
            ctx.stroke();
            ctx.fill();
        }

        const drawLine = (ctx, x1, y1, x2,y2, stroke = 'white', width = 3) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = stroke;
            ctx.lineWidth = width;
            ctx.stroke();
        }

        const drawPoint = (ctx, x, y, fill = 'white') => {
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, 2 * Math.PI, true);
            ctx.fillStyle = fill;
            ctx.fill();
        }

        const drawLineWithStartLengthAngle = (ctx, x1, y1, l1, d1, t1=15) => {
            const x2 = x1 + l1 * Math.cos(Math.PI * d1 / 180.0);
            const y2 = y1 + l1 * Math.sin(Math.PI * d1 / 180.0);
            drawLine(ctx, x1, y1, x2, y2, 'white', t1);
            return {
                X: x2,
                Y: y2
            }
        }

        const drawLineWithStartLengthAngleOffset = (ctx, x1, y1, l1, d1, o1=0, t1=15) => {
            const x2 = x1 + o1 * Math.cos(Math.PI * d1 / 180.0);
            const y2 = y1 + o1 * Math.sin(Math.PI * d1 / 180.0);

            const x3 = x2 + l1 * Math.cos(Math.PI * d1 / 180.0);
            const y3 = y2 + l1 * Math.sin(Math.PI * d1 / 180.0);
            drawLine(ctx, x2, y2, x3, y3, 'white', t1);
            return {
                X: x2,
                Y: y2
            }
        }

        const drawPointWithOffsetStartAngle = (ctx, x1, y1, o1, d1, fill = 'white') => {
            const x2 = x1 + o1 * Math.cos(Math.PI * d1 / 180.0);
            const y2 = y1 + o1 * Math.sin(Math.PI * d1 / 180.0);
            drawPoint(ctx, x2, y2, fill);
            return {
                X: x2,
                Y: y2
            }
        }

        const drawOffsetPoint = (ctx, offset, fill = 'white') => {
            if(offset < MagTubeConfig.StockSegementLengths[0]) {
                return drawPointWithOffsetStartAngle(ctx, MagTubeConfig.StockSegmentPositions[0].X, MagTubeConfig.StockSegmentPositions[0].Y, offset, props.StockPivotAngles[0], fill);
            } else if (offset < MagTubeConfig.StockSegementLengths[0] + MagTubeConfig.StockSegementLengths[1]) {
                return drawPointWithOffsetStartAngle(ctx, MagTubeConfig.StockSegmentPositions[1].X, MagTubeConfig.StockSegmentPositions[1].Y, offset - MagTubeConfig.StockSegementLengths[0], props.StockPivotAngles[1] + props.StockPivotAngles[0], fill);
            } else {
                return drawPointWithOffsetStartAngle(ctx, MagTubeConfig.StockSegmentPositions[2].X, MagTubeConfig.StockSegmentPositions[2].Y, offset - (MagTubeConfig.StockSegementLengths[0] + MagTubeConfig.StockSegementLengths[1]), props.StockPivotAngles[2] + props.StockPivotAngles[1] + props.StockPivotAngles[0], fill);
            }
        }

        const getStockAngleFromOffset = (offset) => {
            if(offset < MagTubeConfig.StockSegementLengths[0]) {
                return props.StockPivotAngles[0];
            } else if (offset < MagTubeConfig.StockSegementLengths[0] + MagTubeConfig.StockSegementLengths[1]) {
                return props.StockPivotAngles[1] + props.StockPivotAngles[0];
            } else {
                return props.StockPivotAngles[2] + props.StockPivotAngles[1] + props.StockPivotAngles[0];
            }
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineCap = "round";

        const cupLength = 60;
        const cheekRestLength = 75;
        const cheekRestHeight = 125;
        const foreTubeHeight = cheekRestHeight - 25;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        const startX = MagTubeConfig.StockSegmentPositions[0].X;
        const startY = MagTubeConfig.StockSegmentPositions[0].Y;

        if(props.ForceTube) {
            drawLine(context, startX, startY-foreTubeHeight, startX + cheekRestLength, startY-foreTubeHeight, 'white', 20);
            drawLine(context, startX, startY-foreTubeHeight, startX, startY - foreTubeHeight + cheekRestHeight, 'white', 20);
            drawRect(context, startX, startY-foreTubeHeight, cheekRestLength + 10, foreTubeHeight - foreTubeHeight + cheekRestHeight - 40, 'white');
        } else {
            drawLine(context, startX, startY-props.CheekRestHeight, startX + cheekRestLength, startY-props.CheekRestHeight, 'white', 20);
            drawLine(context, startX, startY-props.CheekRestHeight, startX, startY-props.CheekRestHeight+cheekRestHeight, 'white', 20);
        }

        let position = drawLineWithStartLengthAngle(context, startX, startY, MagTubeConfig.StockSegementLengths[0], props.StockPivotAngles[0]);

        MagTubeConfig.StockSegmentPositions[1] = position;
        setMagTubeConfig(MagTubeConfig);

        position = drawLineWithStartLengthAngle(context, position.X, position.Y, MagTubeConfig.StockSegementLengths[1], props.StockPivotAngles[1] + props.StockPivotAngles[0]);

        MagTubeConfig.StockSegmentPositions[2] = position;
        setMagTubeConfig(MagTubeConfig);

        position = drawLineWithStartLengthAngle(context, position.X, position.Y, MagTubeConfig.StockSegementLengths[2], props.StockPivotAngles[2] + props.StockPivotAngles[1] + props.StockPivotAngles[0]);

        MagTubeConfig.CupPositions[0] = drawOffsetPoint(context, props.CupOffsets[0], '#eb651a');
        MagTubeConfig.CupPositions[1] = drawOffsetPoint(context, props.CupOffsets[1], '#eb651a');

        drawOffsetPoint(context, props.StrapMountOffsets[0], 'grey');
        drawOffsetPoint(context, props.StrapMountOffsets[1], 'grey');

        drawLineWithStartLengthAngleOffset(context, MagTubeConfig.CupPositions[0].X, MagTubeConfig.CupPositions[0].Y, cupLength, props.CupPivotAngles[0] + getStockAngleFromOffset(props.CupOffsets[0]), 28, 25);
        drawLineWithStartLengthAngleOffset(context, MagTubeConfig.CupPositions[1].X, MagTubeConfig.CupPositions[1].Y, cupLength, props.CupPivotAngles[1] + getStockAngleFromOffset(props.CupOffsets[1]), 28, 25);

    }, [props.StockPivotAngles, props.CheekRestHeight, props.CupPivotAngles, props.CupOffsets, props.StrapMountOffsets, props.ForceTube, MagTubeConfig])
    
    return <div><div><button onClick={downloadImage}>Download Image</button></div><div><canvas ref={canvasRef} {...props}/></div></div>
}

export default Canvas