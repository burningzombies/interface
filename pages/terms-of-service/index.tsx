import type { NextPage } from "next";
import { Layout } from "../../components/layout";
import { PageTitle } from "../../components/page-title";
import Head from "next/head";
import { APP } from "../../utils/consts";

const tos = () => {
  return [
    {
      title: "1. Terms",
      desc: (
        <p>
          By accessing this Website, accessible from https://burningzombies.com,
          you are agreeing to be bound by these Website Terms and Conditions of
          Use and agree that you are responsible for the agreement with any
          applicable local laws. If you disagree with any of these terms, you
          are prohibited from accessing this site. The materials contained in
          this Website are protected by copyright and trade mark law.
        </p>
      ),
    },
    {
      title: "2. Use License",
      desc: (
        <>
          <p>
            Permission is granted to temporarily download one copy of the
            materials on Burning Zombies NFT Collection&apos;s Website for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you
            may not:
          </p>

          <ul>
            <li>modify or copy the materials;</li>
            <li>
              use the materials for any commercial purpose or for any public
              display;
            </li>
            <li>
              attempt to reverse engineer any software contained on Burning
              Zombies NFT Collection&apos;s Website;
            </li>
            <li>
              remove any copyright or other proprietary notations from the
              materials; or
            </li>
            <li>
              transferring the materials to another person or &apos;mirror&apos;
              the materials on any other server.
            </li>
          </ul>

          <p>
            This will let Burning Zombies NFT Collection to terminate upon
            violations of any of these restrictions. Upon termination, your
            viewing right will also be terminated and you should destroy any
            downloaded materials in your possession whether it is printed or
            electronic format.
          </p>
        </>
      ),
    },
    {
      title: "3. Disclaimer",
      desc: (
        <p>
          All the materials on Burning Zombies NFT Collection&apos;s Website are
          provided &apos;as is&apos;. Burning Zombies NFT Collection makes no
          warranties, may it be expressed or implied, therefore negates all
          other warranties. Furthermore, Burning Zombies NFT Collection does not
          make any representations concerning the accuracy or reliability of the
          use of the materials on its Website or otherwise relating to such
          materials or any sites linked to this Website.
        </p>
      ),
    },
    {
      title: "4. Limitations",
      desc: (
        <p>
          Burning Zombies NFT Collection or its suppliers will not be hold
          accountable for any damages that will arise with the use or inability
          to use the materials on Burning Zombies NFT Collection’s Website, even
          if Burning Zombies NFT Collection or an authorize representative of
          this Website has been notified, orally or written, of the possibility
          of such damage. Some jurisdiction does not allow limitations on
          implied warranties or limitations of liability for incidental damages,
          these limitations may not apply to you.
        </p>
      ),
    },
    {
      title: "5. Revisions and Errata",
      desc: (
        <p>
          The materials appearing on Burning Zombies NFT Collection’s Website
          may include technical, typographical, or photographic errors. Burning
          Zombies NFT Collection will not promise that any of the materials in
          this Website are accurate, complete, or current. Burning Zombies NFT
          Collection may change the materials contained on its Website at any
          time without notice. Burning Zombies NFT Collection does not make any
          commitment to update the materials.
        </p>
      ),
    },
    {
      title: "6. Links",
      desc: (
        <p>
          Burning Zombies NFT Collection has not reviewed all of the sites
          linked to its Website and is not responsible for the contents of any
          such linked site. The presence of any link does not imply endorsement
          by Burning Zombies NFT Collection of the site. The use of any linked
          website is at the user’s own risk.
        </p>
      ),
    },
    {
      title: "7. Site Terms of Use Modifications",
      desc: (
        <p>
          Burning Zombies NFT Collection may revise these Terms of Use for its
          Website at any time without prior notice. By using this Website, you
          are agreeing to be bound by the current version of these Terms and
          Conditions of Use.
        </p>
      ),
    },
    {
      title: "8. Your Privacy",
      desc: <p>Please read our Privacy Policy.</p>,
    },
    {
      title: "9. Governing Law",
      desc: (
        <p>
          Any claim related to Burning Zombies NFT Collection&apos;s Website
          shall be governed by the laws of ua without regards to its conflict of
          law provisions.
        </p>
      ),
    },
  ];
};

const TOS: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{APP.NAME} - Terms Of Service</title>
      </Head>
      <div className="container py-5">
        <PageTitle title="Terms Of Service" />

        {tos().map((x, i) => (
          <div key={i} className="mb-5">
            <h3 className="mb-2 text-light text-shadow fw-bold h4">
              {x.title}
            </h3>
            {x.desc}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default TOS;
