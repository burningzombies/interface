import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";

const qa = () => {
  return [
    {
      q: "What is the minting price?",
      a: "It is 2 $AVAX. You should check the tokenomics section on the Litepaper for a detailed explanation.",
    },
    {
      q: "What is maximum supply?",
      a: "It is 3024.",
    },
    {
      q: "How to mint?",
      a: "On the homepage, mint will be available for a week, and unclaimed tokens will be available to burn by everyone.",
    },
    {
      q: "Do zombies have a rarity chart?",
      a: "Yes! All zombies are unique. When the generation is completed, accessories are added to compatible zombies, which makes them rare. Their rarity scores come from their accessories ratio to the whole collection.",
    },
    {
      q: "How can I sell my zombie?",
      a: "The tokens will be tradeable with the ending of the minting and burning. You can use the custom marketplace to sell your token. Don't forget you have to hold the token until the end of the burning.",
    },
    {
      q: 'What is the "Graveyard"?',
      a: "It's the place that you can view your zombies.",
    },
    {
      q: "How can I claim my rewards?",
      a: "Rewards will be claimable after the last token is burned or minted. You can claim it on the loot page.",
    },
    {
      q: "What does it mean to burn a zombie?",
      a: "If there are still unclaimed tokens after minting time is over, users have to burn the rest of them to claim rewards and activate sales.",
    },
    {
      q: "How to burn?",
      a: "Burning can be done on the burn page, and you don't have to have extra permission to do it. Everyone can burn unclaimed tokens.",
    },
    {
      q: "Is it profitable to burn?",
      a: "We are not meant to burn your token. We are asking to burn unminted tokens, and its benefit is to achieve the following path on the roadmap.",
    },
    {
      q: "Can I use other marketplaces?",
      a: "You should use our custom marketplace to keep the project alive, but if you want to sell somewhere else, you can be sure that your token is approved by the market.",
    },
    {
      q: "I transferred my token without claiming rewards. Can I claim back?",
      a: "When you attempt to transfer the token, your rewards are already sent to your wallet, no need to do something extra.",
    },
  ];
};

const FAQ: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Frequently Asking Questions</title>
      </Head>
      <div className="container py-5">
        <PageTitle title="F.A.Q." desc="Frequently asking questions." />
        {qa().map((x, i) => (
          <div key={i} className="mb-5">
            <h2 className="text-light text-shadow fw-bold h4">{x.q}</h2>
            <p className="lead text-dark">{x.a}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FAQ;
