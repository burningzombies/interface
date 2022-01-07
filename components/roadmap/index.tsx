import React from "react";
import roadmapIMG from "../../assets/roadmap.png";
import Image from "next/image";

enum NextStep {
  TESTNET_1,
  TESTNET_2,
  MAINNET,
  MINT,
  BURN,
  MARKETPLACE,
  BURNER_RAFFLE,
  NEXT,
}

const current = NextStep.TESTNET_2;

const renderNext = (step: NextStep) => {
  switch (step) {
    case NextStep.TESTNET_1: {
      return "Testnet Round 1";
    }
    case NextStep.TESTNET_2: {
      return "Testnet Round 2";
    }
    case NextStep.MAINNET: {
      return "Mainnet Deployment";
    }
    case NextStep.MINT: {
      return "Minting Starts";
    }
    case NextStep.BURN: {
      return "Burning Starts";
    }
    case NextStep.MARKETPLACE: {
      return "Marketplace Launch";
    }
    case NextStep.BURNER_RAFFLE: {
      return "Minting Starts";
    }
    default: {
      return "To Be Continued";
    }
  }
};

const renderTitle = () => {
  return (
    <div>
      <div className="d-sm-block d-xs-block d-md-none d-lg-none">
        <h2 className="hero-text fw-bold">
          Roadmap{" "}
          <i
            className="ms-1 fas fa-exclamation"
            style={{ transform: "rotate(15deg)" }}
          ></i>
        </h2>
      </div>
      <div className="d-none d-lg-block d-md-block">
        <h2 className="hero-text fw-bold">
          How is it going
          <i
            className="ms-1 fas fa-question"
            style={{ transform: "rotate(15deg)" }}
          ></i>
        </h2>
        <p title="What's next?" className="lead fw-bold text-light text-shadow">
          <i className="fas fs-2x fa-map-marker me-2"></i>
          {renderNext(current)}
        </p>
      </div>
    </div>
  );
};

export const Roadmap: React.FC = () => {
  return (
    <div className="text-center">
      {renderTitle()}
      <div className="row">
        <div className="col-lg-12">
          <Image
            src={roadmapIMG}
            alt="Roadmap"
            layout="responsive"
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
};
