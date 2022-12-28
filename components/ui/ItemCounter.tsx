import { FC } from 'react';
import { Box } from '@mui/system'
import { IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
interface ItemCounterProps {
    max?: number;
    min?: number;
    value: number;
    onChange: (value: number) => void;
}
export const ItemCounter: FC<ItemCounterProps> = ({
    max = 10,
    min = 1,
    value,
    onChange
}) => {


    const onAdd = () => {
        const newValue = Math.min(value + 1, max)
        onChange(newValue)

    }

    const onRemove = () => {
        const newValue = Math.max(value - 1, min)
        onChange(newValue)
    }
    return (
        <Box
            display={'flex'}
            alignItems={'center'}>
            <IconButton
                disabled={value <= min}
                onClick={onRemove}

            >
                <RemoveCircleOutline />
            </IconButton>
            <Typography
                sx={{
                    width: 40,
                    textAlign: 'center'
                }}
            >
                {value}
            </Typography>
            <IconButton
                disabled={value >= max}
                onClick={onAdd}
            >
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}
