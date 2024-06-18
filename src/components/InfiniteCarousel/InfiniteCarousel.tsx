"use client"

import { useEffect, useRef, useState } from "react";
import { cc } from "@/lib/cc"; 
import useIcons from "../../hooks/useIcons";
import styles from "./InfiniteCarousel.module.css";

export type Media = {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
};

export type CarouselOptions = {
  blurred: boolean;
  itemsOnScreen: 4 | 5 | 6 | 7 | 8;
};

type CarouselProps = {
  data: Media[];
  options?: CarouselOptions;
};

const DEFAULT_CAROUSEL_OPTIONS: CarouselOptions = {
  blurred: false,
  itemsOnScreen: 4,
};

export function InfiniteCarousel({ data, options = DEFAULT_CAROUSEL_OPTIONS }: CarouselProps) {
  const [scrollerData, setScrollerData] = useState<Media[]>();
  const [activeDataIndex, setActiveDataIndex] = useState<number>();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstRenderDoneRef = useRef(false);
  const resetRef = useRef(false);
  const startResetPoint = useRef<number>();
  const endResetPoint = useRef<number>();
  const startIndex = useRef(0);
  const resetIndex = useRef(0);
  const { ArrowLeft, ArrowRight } = useIcons().arrows;

  useEffect(() => {
    if (scrollerRef.current == null) return;
    scrollerRef.current.style.setProperty("--itemsOnScreen", options.itemsOnScreen.toString());

    const halfOfData = Math.floor((data.length - 1) / 2);
    const startMockData = data
      .slice(0, halfOfData + options.itemsOnScreen || 4)
      .map((d) => ({ ...d, id: crypto.randomUUID() }));
    const endMockData = data.slice(-halfOfData - options.itemsOnScreen).map((d) => ({ ...d, id: crypto.randomUUID() }));

    const extendedData = [...endMockData, ...data, ...startMockData];
    setScrollerData(extendedData);

    startIndex.current = Math.floor(extendedData.length / 2);
    resetIndex.current = startIndex.current;
    startResetPoint.current = startIndex.current - data.length;
    endResetPoint.current = startIndex.current + data.length;

    setActiveDataIndex(startIndex.current);

    scrollerRef.current.style.transition = "none";
    scrollerRef.current.style.setProperty("--scrollerIndex", startIndex.current.toString());
    firstRenderDoneRef.current = true;
  }, [data, startIndex, scrollerRef, options.itemsOnScreen]);

  function onArrowClick(direction: "left" | "right") {
    if (scrollerRef.current == null || isScrolling || scrollerData === undefined) return;
    setIsScrolling(true);
    const prevIndex = parseInt(getComputedStyle(scrollerRef.current).getPropertyValue("--scrollerIndex"));

    if (prevIndex === resetIndex.current) scrollerRef.current.style.transition = "transform 250ms ease-in";

    let newIndex;
    if (direction === "left") {
      newIndex = prevIndex > 0 ? prevIndex - 1 : startIndex.current;
    } else {
      newIndex = prevIndex < scrollerData.length - 1 ? prevIndex + 1 : startIndex.current;
    }

    if (
      (direction === "left" && newIndex === startResetPoint.current) ||
      (direction === "right" && newIndex === endResetPoint.current)
    ) {
      resetIndex.current = startIndex.current;
      resetRef.current = true;
    }
    scrollerRef.current.style.setProperty("--scrollerIndex", newIndex.toString());
  }

  function onItemClick(itemIndex: number) {
    if (
      scrollerRef.current == null ||
      isScrolling ||
      scrollerData === undefined ||
      endResetPoint.current === undefined ||
      startResetPoint.current === undefined
    )
      return;
    setIsScrolling(true);

    const prevIndex = parseInt(getComputedStyle(scrollerRef.current).getPropertyValue("--scrollerIndex"));
    if (prevIndex === resetIndex.current) scrollerRef.current.style.transition = "transform 250ms ease-in";

    if (itemIndex >= endResetPoint.current) {
      resetIndex.current = startIndex.current + itemIndex - endResetPoint.current;
      resetRef.current = true;
    }

    if (itemIndex <= startResetPoint.current) {
      resetIndex.current = startIndex.current - (startResetPoint.current - itemIndex);
      resetRef.current = true;
    }

    scrollerRef.current.style.setProperty("--scrollerIndex", itemIndex.toString());
  }

  function onTransitionEnd() {
    if (scrollerRef.current == null) return;

    if (resetRef.current) {
      scrollerRef.current.style.setProperty("--scrollerIndex", resetIndex.current.toString());
      setActiveDataIndex(resetIndex.current);
      resetRef.current = false;
      scrollerRef.current.style.transition = "none";
    } else {
      const activeIndex = parseInt(getComputedStyle(scrollerRef.current).getPropertyValue("--scrollerIndex"));
      setActiveDataIndex(activeIndex);
    }
    setIsScrolling(false);
  }

  return (
    <>
      <section className={styles.carouselContainer}>
        <button className={styles.prevBtn} type="button" onClick={() => onArrowClick("left")}>
          <ArrowLeft />
        </button>
        <div className={styles.carouselScroller} ref={scrollerRef} onTransitionEnd={onTransitionEnd}>
          {scrollerData != undefined &&
            activeDataIndex != undefined &&
            scrollerData.map((item, index) => (
              <img
                className={cc(
                  styles.scrollerImg,
                  item.id === scrollerData[activeDataIndex].id && styles.activeImage,
                  options.blurred && styles.blurred,
                  resetRef.current && styles.resetting
                )}
                key={item.id}
                src={item.imgSrc}
                alt={item.imgAlt}
                onClick={() => onItemClick(index)}
              />
            ))}
        </div>
        <button className={styles.nextBtn} type="button" onClick={() => onArrowClick("right")} disabled={isScrolling}>
          <ArrowRight />
        </button>
      </section>
      {activeDataIndex != undefined && scrollerData != undefined && (
        <div className={styles.activeData}>
          <h3>{scrollerData[activeDataIndex].title}</h3>
          <span>{scrollerData[activeDataIndex].description}</span>
        </div>
      )}
    </>
  );
}
