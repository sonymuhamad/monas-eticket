import { Toolbar, Tab, Link as MuiLink, AppBar } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { TabContext, TabList } from "@mui/lab";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

type Path = "/" | "/history" | "/place" | "/ticket" | "/admin";

const Header = () => {
  const [path, setPath] = useState<Path>("/");
  const router = useRouter();

  const updatePath = useCallback((strPath: string) => {
    if (strPath === "/") {
      setPath(strPath);
    } else if (strPath.startsWith("/history")) {
      setPath("/history");
    } else if (strPath.startsWith("/place")) {
      setPath("/place");
    } else if (strPath.startsWith("/ticket")) {
      setPath("/ticket");
    } else if (strPath.startsWith("/admin")) {
      setPath("/admin");
    }
  }, []);

  useEffect(() => {
    updatePath(router.pathname);
  }, [router.pathname, updatePath]);

  const onChangePath = (e: React.SyntheticEvent, value: unknown) => {
    if (value && typeof value === "string") {
      updatePath(value);
      router.push(`${value}`);
    }
  };

  return (
    <>
      <Head>
        <title>Monas</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar
          id="back-to-top-anchor"
          sx={{
            flexWrap: "wrap",
          }}
        >
          <MuiLink component={Link} href="/" noWrap sx={{ flexGrow: 1 }}>
            <Image
              priority
              src={"/national-monument-jakarta.png"}
              alt="monas-icon"
              height={50}
              width={50}
            />
          </MuiLink>

          <nav>
            <TabContext value={path}>
              <TabList
                value={path}
                onChange={onChangePath}
                aria-label="nav tabs example"
              >
                <Tab
                  label="Home"
                  value="/"
                  aria-label="Home Page"
                  sx={{
                    fontWeight: 750,
                  }}
                />
                <Tab
                  label="Sejarah"
                  value={"/history"}
                  aria-label="Sejarah"
                  sx={{
                    fontWeight: 750,
                  }}
                />
                <Tab
                  label="Wisata"
                  value={"/place"}
                  aria-label="Wisata"
                  sx={{
                    fontWeight: 750,
                  }}
                />
                <Tab
                  label="Tiket"
                  value={"/ticket"}
                  aria-label="Tiket"
                  sx={{
                    fontWeight: 750,
                  }}
                />
                <Tab
                  label="Admin"
                  value={"/admin"}
                  aria-label="Admin"
                  sx={{
                    fontWeight: 750,
                  }}
                />
              </TabList>
            </TabContext>
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
