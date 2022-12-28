import { Box } from "@mui/material"
import Head from "next/head"
import { FC } from "react"

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
}

export const AuthLayout: FC<AuthLayoutProps> = ({
    children,
    title
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                minHeight={'100vh'}
                px={2}
            >
                {children}
            </Box>
        </>
    )
}
