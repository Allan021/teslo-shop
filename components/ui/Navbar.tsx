import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Input,
  InputAdornment,
  Toolbar,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useUiContext } from "../../context";
import { LinkButton } from "./LinkButton";
import { useSearch } from "../../hooks/useSearch";
import { useCartContext } from "../../context/cart/CartContext";

interface PageLinkProps {
  page: string;
  link: string;
}

const pageLinks: PageLinkProps[] = [
  {
    page: "Hombres",
    link: "/categories/man",
  },
  {
    page: "Mujeres",
    link: "/categories/woman",
  },
  {
    page: "Niños",
    link: "/categories/kid",
  },
];

export const Navbar = () => {
  const { asPath } = useRouter();

  const {
    isInputVisible,
    onInputChange,
    onKeyPress,

    searchTerm,
    showInput,
  } = useSearch();
  const { toggleMenu } = useUiContext();
  const { numberOfItmes } = useCartContext();
  return (
    <AppBar
      position="sticky"
      sx={{
        pt: 1,
      }}
    >
      <Toolbar>
        <NextLink href="/" passHref>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Teslo
            </Typography>

            <Typography
              sx={{
                ml: 0.5,
              }}
            >
              | Shop
            </Typography>
          </Box>
        </NextLink>

        <Box flexGrow={1} />

        <Box
          className="fadeIn"
          sx={{
            display: isInputVisible
              ? "none"
              : {
                  xs: "none",
                  sm: "flex",
                },
          }}
        >
          {pageLinks.map((pageObk) => (
            <NextLink key={pageObk.page} href={`${pageObk.link}`} passHref>
              <LinkButton
                color={asPath === pageObk.link ? "primary" : "info"}
                sx={{
                  ml: 1,
                }}
              >
                {pageObk.page}
              </LinkButton>
            </NextLink>
          ))}
        </Box>
        <Box flexGrow={1} />

        <Stack direction={"row"} spacing={1}>
          {isInputVisible ? (
            <Input
              autoFocus
              className="fadeIn"
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onKeyPress={onKeyPress}
              onChange={onInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      showInput(false);
                    }}
                    aria-label="toggle password visibility"
                  >
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              sx={{
                display: {
                  xs: "none",
                  sm: "fllex",
                },
              }}
              className="fadeIn"
              onClick={() => showInput(true)}
            >
              <SearchOutlined />
            </IconButton>
          )}

          <IconButton
            className="fadeIn"
            onClick={toggleMenu}
            sx={{
              display: {
                xs: "flex",
                sm: "none",
              },
            }}
          >
            <SearchOutlined />
          </IconButton>

          <NextLink href="/cart" passHref>
            <Badge
              color="primary"
              badgeContent={numberOfItmes < 10 ? numberOfItmes : "+9"}
            >
              <IconButton>
                <ShoppingCartOutlined />
              </IconButton>
            </Badge>
          </NextLink>
          <LinkButton onClick={toggleMenu} color="info">
            Menú
          </LinkButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
