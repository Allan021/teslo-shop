import { FC } from "react"
import { Box, Typography, } from "@mui/material"
import Head from "next/head"
import { SideBar } from "../ui"
import { AdminNavbar } from '../admin/AdminNavbar';
import { Dashboard } from "@mui/icons-material";

interface ShopLayoutProps {
    children: React.ReactNode
    title: string
    subtitle: string
    icon?: JSX.Element
}

export const AdminLayout: FC<ShopLayoutProps> = ({
    children,
    title,
    subtitle,
    icon= <Dashboard
     fontSize="large"
    /> 
}) => {
    return (
        <>
            <Head>
                <title>Teslo Shop | Adim</title>
            </Head>
            <nav>
                <AdminNavbar />
            </nav>
                <SideBar />

           <main
                    style={{
                        margin: '60px auto',
                        maxWidth: '1440px',
                        padding: '0px 30px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                               alignItems: 'center',
                                flexDirection: 'row',
                                mb: 1,
                            }}
                        >
                            <Box
                            sx={{
                                mr: 1,
                            }}
                            >
                                {icon}
                            </Box>
                            <Box>
                                <Typography variant="h1" component="h1">
                                    {title}
                                </Typography>

                            </Box>
                        </Box> 
                        <Typography variant="h2" component="h2">
                            {subtitle}
                        </Typography>
                    </Box>
                    {children}

                </main>

  

          


        </>
    )
}
