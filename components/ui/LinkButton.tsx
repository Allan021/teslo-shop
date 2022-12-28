import { Button, ButtonProps } from "@mui/material"
import { FC } from "react"

interface Props extends ButtonProps {
  children: React.ReactNode

}
export const LinkButton: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button {...rest}
      sx={{
        borderRadius: 30,
      }}
      className={rest.color === "primary" ? "" : "circular-btn"}
    >
      {children}
    </Button>
  )
}
