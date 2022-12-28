import { FC } from "react"
import { Box, } from "@mui/material"
import Head from "next/head"
import { Navbar, SideBar } from "../ui"

interface ShopLayoutProps {
    children: React.ReactNode
    title: string
    description: string
    image?: string

}

export const ShopLayout: FC<ShopLayoutProps> = ({
    children,
    title,
    description, image
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />

                <link rel="apple-touch-icon" href="/teslo.svg" />


                {/* og tags */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />

                {image && <meta property="og:image" content={image} />}

            </Head>
            <nav>
                <Navbar />
            </nav>
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 1440,
                    margin: '0 auto',
                }}>

                <SideBar />
                <Box
                    sx={{ py: 5, px: 5 }}
                    width={"100%"}
                >
                    {children}
                </Box>


            </Box>


        </>
    )
}
