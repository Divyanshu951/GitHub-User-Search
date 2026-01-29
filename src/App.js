import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(""); // 1. Added error state
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearchResults() {
      try {
        setisLoading(true);
        setError("");

        const res = await fetch(
          `https://api.github.com/search/users?q=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        // Defensive Coding: data.items might be undefined if API limits hit
        setSearchResult(data.items || []);
        setisLoading(false);
      } catch (err) {
        // Abort Handling
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
          setSearchResult([]);
          setisLoading(false);
        }
      }
    }

    if (query.length > 3) {
      fetchSearchResults();
    } else {
      setSearchResult([]);
      setisLoading(false);
    }

    return () => controller.abort();
  }, [query]);

  function handleUserSelection(userDetails) {
    setSelectedUser(userDetails);
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="result-container">
        <div className="search-results">
          {error && <p className="error">{error}</p>}

          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            searchResult.map((user) => (
              <SearchListItem
                searchData={user}
                key={user.id}
                onUserSelection={handleUserSelection}
              />
            ))
          )}

          {/* UI feedback for 0 results */}
          {!isLoading &&
            !error &&
            query.length > 3 &&
            searchResult.length === 0 && <p>No users found.</p>}
        </div>

        <div className="selected-user">
          {selectedUser ? (
            <UserDatails userDetails={selectedUser} />
          ) : (
            <p>Select a user to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchListItem({ searchData, onUserSelection }) {
  return (
    <div
      className="search-result-item"
      onClick={() => onUserSelection(searchData)}
    >
      <h3>{searchData.login}</h3>
      <img src={searchData.avatar_url} alt={`${searchData.login} Avatar`} />
    </div>
  );
}

function UserDatails({ userDetails }) {
  return (
    <div className="search-result-item">
      <h2>{userDetails.login}</h2>
      <img src={userDetails.avatar_url} alt={`${userDetails.login} Avatar`} />
      <br />
      <a href={userDetails.html_url} target="_blank" rel="noreferrer">
        View GitHub Profile
      </a>
    </div>
  );
}
