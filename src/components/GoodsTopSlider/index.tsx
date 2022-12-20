import styled from "styled-components"
import BannerMainTop1 from "@images/illustration/Banner_mainTop1.png";
import BannerMainTop2 from "@images/illustration/Banner_mainTop2.png"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom";

const HomeTopSlider = () => {
    const sliderContainer = useRef<any>();
    const DisplayImageNumber = 2;
    const CalculationImageNumber = DisplayImageNumber - 1;
    const [touchPosition, setTouchPosition] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const imgaes = [
        { url: BannerMainTop1 },
        { url: BannerMainTop2, link: "https://forms.gle/GTbYP98QXpLDuBRH9" }
    ]

    let timerId: any = null;

    // 시계 시작
    function StartClock() {
        setCurrentIndex(i => i < CalculationImageNumber ? i + 1 : 0)
        setPosition(0)
        timerId = setTimeout(StartClock, 3000); //재귀호출 하는중 1초후에 다시 StartClock이 실행되도록
    }

    function StopClock() {
        if (timerId != null) {
            clearTimeout(timerId);
        }
    }

    useEffect(() => {
        StartClock()

        return () => StopClock();
    }, [])

    const handleMouseStart = (event: any) => {
        if (touchPosition === null) return
        const endPosition = getPositionX(event)

        if (endPosition - touchPosition > 50) {
            setCurrentIndex(i => i > 0 ? i - 1 : CalculationImageNumber)
            setPosition(0)
        } else if (touchPosition - endPosition > 50) {
            setCurrentIndex(i => i < CalculationImageNumber ? i + 1 : 0)
            setPosition(0)
        }

    }


    const handleMouseEnd = (event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        setTouchPosition(getPositionX(event))
        event.preventDefault();
    };

    const handleTouchStart = (event: any) => {
        setTouchPosition(getPositionX(event))
    }


    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if (touchPosition === null) return
        const endPosition = getPositionX(event)

        if (endPosition - touchPosition > 50) {
            setCurrentIndex(i => i > 0 ? i - 1 : CalculationImageNumber)
            setPosition(0)
        } else if (touchPosition - endPosition > 50) {
            setCurrentIndex(i => i < CalculationImageNumber ? i + 1 : 0)
            setPosition(0)
        }

        
    };

    const handleMove = useCallback((event: any) => {
        if (touchPosition === null) return
        const currentTouch = getPositionX(event)
        const diff = touchPosition - currentTouch

        if (diff > 10) {
            setPosition(-getWindowWidth())

        }
        if (diff < 10) {
            setPosition(0)
        }
    }, [touchPosition])

    useEffect(() => {
        window.addEventListener("resize", () => setPosition(0));
        return () => window.addEventListener("resize", () => setPosition(0));
    }, [])


    const setPosition = (postion: number) => {
        sliderContainer.current.style.transform = `translateX(${postion}px)`
    }

    const nextIndex = currentIndex >= CalculationImageNumber ? 0 : currentIndex + 1;

    return (
        <Wrapper
            ref={sliderContainer}
            onMouseUp={handleMouseStart}
            onMouseDown={handleMouseEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>
            {
                imgaes[currentIndex].link ?
                    <a href={imgaes[currentIndex].link} target="_blank">
                        <Slide>
                            <img src={imgaes[currentIndex].url} alt="하늘색 옷을 입은 남자" />
                        </Slide>
                    </a> : <Slide>
                        <img src={imgaes[currentIndex].url} alt="하늘색 옷을 입은 남자" />
                    </Slide>
            }
            {
                imgaes[nextIndex].link ?
                    <a href={imgaes[nextIndex].link} target="_blank" rel="noopener noreferrer">
                        <Slide>
                            <img src={imgaes[nextIndex].url} alt="하늘색 옷을 입은 남자" />
                        </Slide>
                    </a> : <Slide>
                        <img src={imgaes[nextIndex].url} alt="하늘색 옷을 입은 남자" />
                    </Slide>
            }
        </Wrapper>
    )
}


const getPositionX = (event: any) => {
    return event.type.includes('mouse') ? event.pageX : event.changedTouches[0].screenX
}

const getWindowWidth = () => {
    if (window.innerWidth > 600) return 600;
    return window.innerWidth;
}

const Wrapper = styled.div`
    display: inline-flex;
    overflow: hidden;
    cursor: grab;
    z-index: 1;
    transition: transform 2s ease-out;
`

const Slide = styled.div`
    width: 100vw;
    padding: 1.6rem 2rem;

    @media screen and (min-width:600px){
        width: 600px;
    }

    img{
        width: 100%;
        height: 100%;
        -webkit-user-drag: none;
    }
`

export default HomeTopSlider