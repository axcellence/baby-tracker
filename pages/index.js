import { getBuilderName } from "ast-types";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const usedNappy = async (amount) => {
    const quantity = amount || -1;

    await fetch(
      `/api/nappies?${new URLSearchParams({
        quantity,
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
