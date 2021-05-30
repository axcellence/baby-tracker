import { getBuilderName } from "ast-types";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const feed = async (type, feed, amount = null) => {
    await fetch(
      `/api/feeding?${new URLSearchParams({
        type,
        feed,
        amount,
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
          feed("right boob", 1);
        }}
      >
        R
      </button>

      <button
        onClick={() => {
          feed("left boob", 1);
        }}
      >
        L
      </button>

      <button
        onClick={() => {
          feed("bottle", 1);
        }}
      >
        Bottle
      </button>
      <button
        onClick={() => {
          feed("stop", 0, 120);
        }}
      >
        Stop feed
      </button>
    </main>
  );
}
