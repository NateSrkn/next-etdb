import React from "react";
import Head from "next/head";
import { MediaList } from "../components/MediaList";
import { Carousel } from "../components/common/Carousel";
import { useTrendingList } from "../hooks/useQueriesList";
import { FeatureCard } from "../components/cards/FeatureCard";
import { useWindowSize } from "../hooks/useWindowSize";
export default function Home() {
  const { data: trending, isSuccess } = useTrendingList();
  const { width } = useWindowSize();
  return (
    <React.Fragment>
      <Head>
        <title>Entertainment Database</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isSuccess && (
        <Carousel
          infinite={true}
          autoplay={false}
          className={`featured-slider`}
        >
          {trending.results.map((media, index) => (
            <FeatureCard data={media} key={media.id + index} width={width} />
          ))}
        </Carousel>
      )}

      <div className="root">
        <section>
          <MediaList type={`movie`} />
        </section>
        <section>
          <MediaList type={`tv`} />
        </section>
      </div>
    </React.Fragment>
  );
}
