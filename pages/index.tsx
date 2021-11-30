import type { NextPage } from "next";
import { Layout } from "../components/layout";
import { Hero } from "../components/hero";
import { Mint } from "../components/mint";
import { Story } from "../components/story";
import { Team } from "../components/team";
import { NeonMonsters } from "../components/neonmonsters";
import { Roadmap } from "../components/roadmap";

const Home: NextPage = () => {
  return (
    <Layout>
      <section className="container py-5">
        <Hero />
      </section>

      <section className="inner-shadow zombie-bg py-5" id="mint">
        <div className="container">
          <Mint />
        </div>
      </section>

      <section className="container py-5">
        <NeonMonsters />
      </section>

      <section className="inner-shadow zombie-bg py-5" id="roadmap">
        <div className="container-fluid">
          <Roadmap />
        </div>
      </section>

      <section className="container py-5" id="story">
        <Story />
      </section>

      <section className="inner-shadow zombie-bg py-5" id="team">
        <div className="container">
          <Team />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
