import { getBuilderName } from "ast-types";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const usedNappy = async (amount, type) => {
    const quantity = amount || -1;

    console.log(type);

    await fetch(
      `/api/nappies?${new URLSearchParams({
        quantity,
        type,
      })}`,
      {
        method: "POST",
      }
    );
  };

  const isAsleep = async (sleep) => {
    await fetch(
      `/api/sleep?${new URLSearchParams({
        sleep,
      })}`,
      {
        method: "POST",
      }
    );
  };

  return (
    <main>
      <button
        onClick={() => {
          usedNappy();
        }}
      >
        Nappy used
      </button>

      <button
        onClick={() => {
          usedNappy(-1, "poopy");
        }}
      >
        Nappy mixed
      </button>

      <button
        onClick={() => {
          isAsleep(1);
        }}
      >
        Is Asleep
      </button>

      <button
        onClick={() => {
          isAsleep(0);
        }}
      >
        Is Awake
      </button>
    </main>
  );
}
