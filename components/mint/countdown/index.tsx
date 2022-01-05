import React from "react";
import Countdown from "react-countdown";
import { Spinner } from "../../../components/spinner";
import { Contract } from "ethers";

type Props = {
  masterContract: Contract | undefined | null;
};

export const MintCountdown: React.FC<Props> = ({ masterContract }) => {
  const [start, setStart] = React.useState<number | undefined>();
  const [duration, setDuration] = React.useState<number | undefined>();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const start = (await masterContract.saleStartsAt()).toNumber();
        const duration = (await masterContract.saleDuration()).toNumber();

        if (isMounted) {
          setStart(start);
          setDuration(duration);
        }
      } catch (err) {
        setStart(undefined);
        setDuration(undefined);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [masterContract]);

  return (
    <>
      <i className="fas fa-stopwatch me-2"></i>
      {(() => {
        if (typeof start === "undefined" || typeof duration === "undefined")
          return <Spinner color="text-light" />;
        return (
          <Countdown
            date={start * 1000}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              if (completed)
                return (
                  <Countdown
                    date={start * 1000 + duration * 1000}
                    renderer={({
                      days,
                      hours,
                      minutes,
                      seconds,
                      completed,
                    }) => {
                      if (completed) return <>Time is Over!</>;
                      return (
                        <>
                          Minting ends in {days} {days > 1 ? "days" : "day"}{" "}
                          {hours} {hours > 1 ? "hours" : "hour"} {minutes}{" "}
                          {minutes > 1 ? "minutes" : "minute"} and {seconds}{" "}
                          {seconds > 1 ? "seconds" : "second"}
                        </>
                      );
                    }}
                  />
                );
              return (
                <>
                  Minting starts in {days} {days > 1 ? "days" : "day"} {hours}{" "}
                  {hours > 1 ? "hours" : "hour"} {minutes}{" "}
                  {minutes > 1 ? "minutes" : "minute"} and {seconds}{" "}
                  {seconds > 1 ? "seconds" : "second"}
                </>
              );
            }}
          />
        );
      })()}
    </>
  );
};
