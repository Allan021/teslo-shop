  import {
    AppBar,
    Box,
    Toolbar,
    Typography,
  } from "@mui/material";
  import NextLink from "next/link";
  import { useUiContext } from "../../context";
  import { LinkButton } from "../ui";
  
  
  
  export const AdminNavbar = () => {
  
    const { toggleMenu } = useUiContext();
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
  
      
                <Box sx={{ flexGrow: 1 }} />
        
  
        
          <LinkButton onClick={toggleMenu} color="info">
              Menú
            </LinkButton>
        </Toolbar>
      </AppBar>
    );
  };
  