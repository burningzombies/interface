import React from "react";
import Countdown from "react-countdown";
import { APP } from "../../../utils/consts";

export const MintCountdown: React.FC = () => {
  return (
    <>
      <i className="fas fa-stopwatch me-2"></i>
      {(() => {
        return (
          <Countdown
            date={APP.MINT_START}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              if (completed)
                return (
                  <Countdown
                    date={APP.MINT_END}
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
