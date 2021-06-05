const Home = () => {
  const check = async (type) => {
    await fetch(
      `/api/check?${new URLSearchParams({
        type,
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
          check("feed");
        }}
      >
        check last feed
      </button>
      <button
        onClick={() => {
          check("sleep");
        }}
      >
        check last sleep
      </button>
    </main>
  );
};

export default Home;
