import { useUiContext } from "../../context";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useSearch } from "../../hooks/useSearch";
import { useAuthContext } from "../../context/auth/AuthContext";

export const SideBar = () => {
  const { isMenuOpen, toggleMenu } = useUiContext();
  const { searchTerm, onInputChange, onKeyPress, onSearch } = useSearch();
  const { isLoggedIn, user, logout } = useAuthContext();

  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
    toggleMenu();
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleMenu}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 280, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus={true}
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onKeyPress={onKeyPress}
              onChange={onInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      onSearch();
                    }}
                    aria-label="toggle password visibility"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          {isLoggedIn && (
            <>
              <ListItemButton onClick={() => navigateTo("/profile")}>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo("/orders/history")}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mis Ordenes"} />
              </ListItemButton>
            </>
          )}

          <ListItemButton
            onClick={() => navigateTo("/categories/man")}
            sx={{ display: { xs: "", sm: "none" } }}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Hombres"} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo("/categories/woman")}
            sx={{ display: { xs: "", sm: "none" } }}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Mujeres"} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo("/categories/kid")}
            sx={{ display: { xs: "", sm: "none" } }}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Niños"} />
          </ListItemButton>

          {isLoggedIn ? (
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() =>
                navigateTo(`/auth/login?redirect_to=${router.asPath}`)
              }
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItemButton>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItemButton>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={"Productos"} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Ordenes"} />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItemButton>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
