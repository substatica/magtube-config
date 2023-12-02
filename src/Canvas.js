import React, {useState, useRef, useEffect } from 'react'

const Canvas = props => {
    const [MagTubeConfig, setMagTubeConfig] = useState({
        StockPivotAngles: props.StockPivotAngles,
        CheekRestHeight: props.CheekRestHeight,
        CupPivotAngles: props.CupPivotAngles,
        CupOffsets: props.CupOffsets,
        StrapMountOffsets: props.StrapMountOffsets,
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
        const drawLine = (ctx, x1, y1, x2,y2, stroke = 'black', width = 3) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = stroke;
            ctx.lineWidth = width;
            ctx.stroke();
        }

        const drawPoint = (ctx, x, y, fill = 'black') => {
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, 2 * Math.PI, true);
            ctx.fillStyle = fill;
            ctx.fill();
        }

        const drawLineWithStartLengthAngle = (ctx, x1, y1, l1, d1, t1=15) => {
            const x2 = x1 + l1 * Math.cos(Math.PI * d1 / 180.0);
            const y2 = y1 + l1 * Math.sin(Math.PI * d1 / 180.0);
            drawLine(ctx, x1, y1, x2, y2, 'black', t1);
            return {
                X: x2,
                Y: y2
            }
        }

        const drawPointWithOffsetStartAngle = (ctx, x1, y1, o1, d1, fill = 'black') => {
            const x2 = x1 + o1 * Math.cos(Math.PI * d1 / 180.0);
            const y2 = y1 + o1 * Math.sin(Math.PI * d1 / 180.0);
            drawPoint(ctx, x2, y2, fill);
            return {
                X: x2,
                Y: y2
            }
        }

        const drawOffsetPoint = (ctx, offset, fill = 'black') => {
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

        const cupLength = 75;
        const cheekRestLength = 75;
        const cheekRestHeight = 125;

        context.clearRect(0, 0, canvas.width, canvas.height);
        
        const startX = MagTubeConfig.StockSegmentPositions[0].X;
        const startY = MagTubeConfig.StockSegmentPositions[0].Y;

        drawLine(context, startX, startY-props.CheekRestHeight, startX + cheekRestLength, startY-props.CheekRestHeight, 'black', 15);
        drawLine(context, startX, startY-props.CheekRestHeight, startX, startY-props.CheekRestHeight+cheekRestHeight, 'black', 15);

        drawPoint(context, startX, startY);
        let position = drawLineWithStartLengthAngle(context, startX, startY, MagTubeConfig.StockSegementLengths[0], props.StockPivotAngles[0]);

        drawPoint(context, position.X, position.Y);

        MagTubeConfig.StockSegmentPositions[1] = position;
        setMagTubeConfig(MagTubeConfig);

        position = drawLineWithStartLengthAngle(context, position.X, position.Y, MagTubeConfig.StockSegementLengths[1], props.StockPivotAngles[1] + props.StockPivotAngles[0]);

        drawPoint(context, position.X, position.Y);

        MagTubeConfig.StockSegmentPositions[2] = position;
        setMagTubeConfig(MagTubeConfig);

        position = drawLineWithStartLengthAngle(context, position.X, position.Y, MagTubeConfig.StockSegementLengths[2], props.StockPivotAngles[2] + props.StockPivotAngles[1] + props.StockPivotAngles[0]);

        MagTubeConfig.CupPositions[0] = drawOffsetPoint(context, props.CupOffsets[0], 'red');
        MagTubeConfig.CupPositions[1] = drawOffsetPoint(context, props.CupOffsets[1], 'red');

        drawOffsetPoint(context, props.StrapMountOffsets[0], 'green');
        drawOffsetPoint(context, props.StrapMountOffsets[1], 'green');

        drawLineWithStartLengthAngle(context, MagTubeConfig.CupPositions[0].X, MagTubeConfig.CupPositions[0].Y, cupLength, props.CupPivotAngles[0] + getStockAngleFromOffset(props.CupOffsets[0]), 15);
        drawLineWithStartLengthAngle(context, MagTubeConfig.CupPositions[1].X, MagTubeConfig.CupPositions[1].Y, cupLength, props.CupPivotAngles[1] + getStockAngleFromOffset(props.CupOffsets[1]), 15);

    }, [props.StockPivotAngles, props.CheekRestHeight, props.CupPivotAngles, props.CupOffsets, props.StrapMountOffsets, MagTubeConfig])
    
    return <div><div><button onClick={downloadImage}>Download</button></div><div><canvas ref={canvasRef} {...props}/></div></div>
}

export default Canvas