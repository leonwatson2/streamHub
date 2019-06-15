import React, { useState, useEffect, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { CHAT_GAME_SWITCH_IMAGE } from '../../Events'

const BrokenImage = styled.div`
    display: grid;
    position: relative;
    grid-template: 1fr 1fr / 1fr 1fr 1fr;
    margin: auto;
`
const ImagePiece = styled.div`
    position: absolute;
    z-index: 100;
    transition: all 0.6s cubic-bezier(0.58, -0.55, 0.265, 1.45);
	perspective: 1000;
`
const GlobalBackground = createGlobalStyle`
    body {
        background: white !important;
    }
`

export function PictureGame({ imageUrl, socket }) {
    const [boxes, setBoxes] = useState({})
    const [image, setImage] = useState(null)

    const chatInteractFn = ({ number1, number2 }) => {
        
        if (number1 > 0 && number2 > 0 && number1 < 7 && number2 < 7 && Object.keys(boxes).length) {
            setBoxes(switchBoxes(boxes, number1, number2))
        }
    }
    useEffect(() => {
        if (socket)
            socket.on(CHAT_GAME_SWITCH_IMAGE, chatInteractFn)
        return ()=>{
            if (socket)
                socket.removeListener(CHAT_GAME_SWITCH_IMAGE, chatInteractFn)
        }
    }, [socket, boxes])
    useEffect(() => {
        const crImg = new Image()
        crImg.src = imageUrl;

        crImg.onload = () => {
            setImage(crImg)
        }
    }, [imageUrl])

    useEffect(() => {
        if (image) {
            setBoxes(getBoxStyles(image.width, image.height, image.src))

        }
    }, [image])

    if (!image)
        return (
            <Fragment>
                <GlobalBackground />
                'Loading'
        </Fragment>
        )
    return (
        <BrokenImage style={{ width: image.width, height: image.height }}>
            <GlobalBackground />
            {
                Object.keys(boxes).map(box => <ImagePiece key={box} className={'box'} style={boxes[box]} />)
            }

        </BrokenImage>
    )
}

function isLandscape({ width, height }) {
    return width > height
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function getBoxStyles(width, height, src) {
    let widthDivision, heightDivision;
    if(isLandscape({ width, height })){
        widthDivision = 3
        heightDivision = 2
    } else {
        widthDivision = 2
        heightDivision = 3
    }
    const positions = shuffle([ { top: 0, left: 0 }, 
                        { top: 0, left: 1 * width / widthDivision }, 
                        { top: 0, left: heightDivision * width / widthDivision },
                        { top: 1 * height / heightDivision, left: 0 },
                        { top: 1 * height / heightDivision, left: 1 * width / widthDivision },
                        { top: 1 * height / heightDivision, left: heightDivision * width / widthDivision }
                    ])
    
    return {
        1: { top: 0, left: 0, backgroundImage: `url(${src})`, width: width / widthDivision, height: height / heightDivision, backgroundPositionX: 0, backgroundPositionY: 0 },
        2: { top: 0, left: 1 * width / widthDivision, backgroundImage: `url(${src})`, width: width / widthDivision, height: height / heightDivision, backgroundPositionX: -1 * width / widthDivision, backgroundPositionY: 0 },
        3: { top: 0, left: heightDivision * width / widthDivision, backgroundImage: `url(${src})`, width: width / widthDivision, height: height / heightDivision, backgroundPositionX: -heightDivision * width / widthDivision, backgroundPositionY: 0 },
        4: { top: 1 * height / heightDivision, left: 0, backgroundImage: `url(${src})`, width: width / widthDivision, height: height / heightDivision, backgroundPositionX: 0, backgroundPositionY: -1 * height / heightDivision },
        5: { top: 1 * height / heightDivision, left: 1 * width / widthDivision, backgroundImage: `url(${src})`, width: width / widthDivision, height: height / heightDivision, backgroundPositionX: -1 * width / widthDivision, backgroundPositionY: -1 * height / heightDivision },
        6: { top: 1 * height / heightDivision, left: heightDivision * width / widthDivision, backgroundImage: `url(${src})`, width: width / widthDivision, height: height / heightDivision, backgroundPositionX: -heightDivision * width / widthDivision, backgroundPositionY: -1 * height / heightDivision }
    }
}
function switchBoxes(boxes, position1, position2) {
    console.log(boxes, boxes[position1], position1)
    const [{ top: top1, left: left1 }, { top: top2, left: left2 }] = [boxes[position1], boxes[position2]]
    let newBox1 = {
        ...boxes[position1],
        top: top2,
        left: left2
    }
    let newBox2 = {
        ...boxes[position2],
        top: top1,
        left: left1
    }

    return {
        ...boxes,
        [position1]: newBox1,
        [position2]: newBox2
    }
}


export default PictureGame