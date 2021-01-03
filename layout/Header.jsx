import React from "react";
import Link from "next/link";
import { SearchBar } from "../components/SearchBar";
import Grid from "../components/Grid";
export const Header = () => {
  return (
    <header className="root" style={{ display: "flex" }}>
      <Grid
        component={"section"}
        base={8}
        md={6}
        className="nav-header-content"
        style={{ padding: "1rem" }}
      >
        <div className="sub-content">
          <Link href="/">Home</Link>
        </div>
      </Grid>
      <Grid base={3} md={5} className="search">
        <SearchBar />
      </Grid>
    </header>
  );
};
