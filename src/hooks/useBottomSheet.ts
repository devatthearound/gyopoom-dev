import { useRef, useEffect, useState } from 'react';

interface BottomSheetMetrics {
    touchStart: {
        sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
        touchY: number; // touchstart에서 터치 포인트의 Y값
    };
    touchMove: {
        prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
        movingDirection: "none" | "down" | "up"; // 유저가 터치를 움직이고 있는 방향 
    };
}

export function useBottomSheet(isShow: boolean, y: number) {
    const MIN_Y = y; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
    const MAX_Y = y - 48; // 바텀시트가 최소로 내려갔을 때의 y 값
    const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y; // 바텀시트의 세로 길이
    const sheetRef = useRef<HTMLDivElement>(null);
    const modelSheetRef = useRef<HTMLDivElement>(null);
    const metrics = useRef<BottomSheetMetrics>({
        touchStart: {
            sheetY: MIN_Y,
            touchY: 0,
        },
        touchMove: {
            prevTouchY: 0,
            movingDirection: "none",
        },
    });
    useEffect(() => {
        if (isShow) {
            modelSheetRef.current?.style.setProperty('display', "block");
            sheetRef.current?.style.setProperty('transform', 'translateY(0)');
        } else {
            modelSheetRef.current?.style.setProperty('display', "none");
        }
    }, [isShow])

    // Touch Event 핸들러들을 등록한다. 
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            const { touchStart, touchMove } = metrics.current;

            if (sheetRef.current) {
                touchStart.sheetY = sheetRef.current.getBoundingClientRect().y;
                touchStart.touchY = e.touches[0].clientY;
            }

        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();

            const { touchStart, touchMove } = metrics.current;
            const currentTouch = e.touches[0];
            touchMove.prevTouchY = touchStart.touchY;

            if (touchMove.prevTouchY < currentTouch.clientY) {
                touchMove.movingDirection = 'down';
            }

            if (touchMove.prevTouchY > currentTouch.clientY) {
                touchMove.movingDirection = 'up';
            }

            // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
            const touchOffset = currentTouch.clientY - touchStart.touchY;
            let nextSheetY = touchStart.sheetY + touchOffset;

            // nextSheetY 는 MIN_Y와 MAX_Y 사이의 값으로 clamp 되어야 한다
            if (nextSheetY <= MIN_Y) {
                nextSheetY = MIN_Y;
            }

            if (nextSheetY >= MAX_Y) {
                nextSheetY = MAX_Y;
            }
            // sheet 위치 갱신. 
            sheetRef.current?.style.setProperty('transform', `translateY(${nextSheetY}px)`);
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const { touchMove } = metrics.current;

            // Snap Animation
            const currentSheetY = sheetRef.current?.getBoundingClientRect().y;

            if (currentSheetY !== MIN_Y) {
                if (touchMove.movingDirection === 'down') {
                    modelSheetRef.current?.style.setProperty('display', "none");
                    sheetRef.current?.style.setProperty('transform', `translateY(${MAX_Y}px)`);
                }

                if (touchMove.movingDirection === 'up') {
                    modelSheetRef.current?.style.setProperty('display', "block");
                    sheetRef.current?.style.setProperty('transform', 'translateY(0)');
                }
            }

            // metrics 초기화.
            metrics.current = {
                touchStart: {
                    sheetY: 0,
                    touchY: 0,
                },
                touchMove: {
                    prevTouchY: 0,
                    movingDirection: "none",
                },
            };
        };

        sheetRef.current?.addEventListener('touchstart', handleTouchStart);
        sheetRef.current?.addEventListener('touchmove', handleTouchMove);
        sheetRef.current?.addEventListener('touchend', handleTouchEnd);
        modelSheetRef.current?.addEventListener('touchstart', handleTouchStart);
        modelSheetRef.current?.addEventListener('touchmove', handleTouchMove);
        modelSheetRef.current?.addEventListener('touchend', handleTouchEnd);

        return () => {
            sheetRef.current?.removeEventListener('touchstart', handleTouchStart);
            sheetRef.current?.removeEventListener('touchmove', handleTouchMove);
            sheetRef.current?.removeEventListener('touchend', handleTouchEnd);
            modelSheetRef.current?.removeEventListener('touchstart', handleTouchStart);
            modelSheetRef.current?.removeEventListener('touchmove', handleTouchMove);
            modelSheetRef.current?.addEventListener('touchend', handleTouchEnd);
        }
    }, [])


    return { sheetRef, modelSheetRef, isShow };
}