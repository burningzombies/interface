import React from "react";
import useWindowSize from "../../../hooks/use-window-size";
import { Spinner } from "../../spinner";

type Props = {
  loading: boolean;
  desc: string;
  btnValue: string;
  fn: () => void;
};

export const Bar: React.FC<Props> = ({ desc, btnValue, fn, loading }) => {
  const { width, height } = useWindowSize();

  if (width && height && width <= 768) {
    return (
      <>
        <div className="bg-danger fixed-bottom shadow">
          <div className="container mt-3 mb-4">
            <div className="row">
              <div className="col-12 text-end">
                <button onClick={fn} className="w-100 btn btn-light btn-sm">
                  {loading ? <Spinner /> : btnValue}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "3.9rem" }}></div>
      </>
    );
  }

  return (
    <>
      <div className="bg-danger fixed-bottom shadow">
        <div className="container mt-3 mb-1">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-8">
              <p className="text-light mt-1">{desc}</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 text-end">
              <button onClick={fn} className="btn btn-light btn-sm">
                {loading ? <Spinner /> : btnValue}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "4rem" }}></div>
    </>
  );
};
