import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../utils";
import { getFilterableTraits } from "../../utils/queries";
import { Spinner } from "../spinner";
import { ByRarity } from "./by-rarity";

interface Data {
  traits: Array<{
    id: string;
    type: string;
    value: string;
  }>;
}

const submit = (val: string) => {
  return (
    <div className="col-lg-2 col-md-4 col-sm-6 my-1">
      <button role="submit" className="w-100 btn btn-outline-warning">
        <i className="fas fa-filter"></i> {val}
      </button>
    </div>
  );
};

type Props = {
  initialPathname: string;
};

export const Filter: React.FC<Props> = ({ initialPathname }) => {
  const router = useRouter();

  const { data, error } = useSWR<Data, Error>(getFilterableTraits(), fetcher);

  const filter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const f = new FormData(e.currentTarget);

    router.replace({
      pathname: initialPathname,
      query: {
        page: 1,
        tier: (f.get("tier") as string) || "",
        skin: (f.get("skin") as string) || "",
        background: (f.get("background") as string) || "",
        mouth: (f.get("mouth") as string) || "",
        eyes: (f.get("eyes") as string) || "",
        sort: router.query.sort,
      },
    });
  };

  const isReloaded = () => {
    return !router.query.page;
  };

  const col = (values: Data["traits"]) => {
    return (
      <div className="col-lg-2 col-md-4 col-sm-6 my-1">
        {(() => {
          if (isReloaded())
            return (
              <div className="text-center mt-2">
                <Spinner color="text-warning" />
              </div>
            );
          return (
            <select
              className="form-select"
              defaultValue={router.query[values[0].type.toLowerCase()]}
              name={values[0].type.toLowerCase()}
            >
              <option value="">
                {" "}
                - {values[0].type === "Background"
                  ? "BG"
                  : values[0].type} -{" "}
              </option>
              {values.map((i) => (
                <option key={i.id} value={i.value}>
                  {i.value}
                </option>
              ))}
            </select>
          );
        })()}
      </div>
    );
  };

  return (
    <div
      className={`p-2 bg-dark ${
        router.pathname === "/graveyard" || router.pathname.includes("/users")
          ? "rounded-3"
          : "rounded-top"
      } shadow`}
    >
      {(() => {
        if (!data && !error)
          return (
            <div className="text-center m-1">
              <Spinner color="text-warning" />
            </div>
          );
        if (error)
          return (
            <div className="text-center m-1">
              <span className="text-light">{error.message}</span>
            </div>
          );
        if (!data || !(data.traits.length > 0))
          return (
            <div className="text-center m-1">
              <span className="text-light">Content couldn&apos;t find.</span>
            </div>
          );
        return (
          <form className="row justify-content-center" onSubmit={filter}>
            {isReloaded() ? (
              <div className="col-lg-2 col-md-4 col-sm-6 my-1">
                <div className="text-center mt-2">
                  <Spinner color="text-warning" />
                </div>
              </div>
            ) : (
              <ByRarity defaultValue={router.query.tier as string} />
            )}
            {col(data.traits.filter((t) => t.type === "Background"))}
            {col(data.traits.filter((t) => t.type === "Skin"))}
            {col(data.traits.filter((t) => t.type === "Mouth"))}
            {col(data.traits.filter((t) => t.type === "Eyes"))}
            {submit("Filter")}
          </form>
        );
      })()}
    </div>
  );
};
