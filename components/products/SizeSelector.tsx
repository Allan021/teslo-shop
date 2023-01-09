import { ISize } from "../../interfaces"
import { FC } from 'react';
import { Button, Stack } from "@mui/material";

interface SizeSelectorProps {
    sizes: ISize[];
    selectedSize?: ISize;
    onSelectedSize: (size: ISize) => void;
}

export const SizeSelector: FC<SizeSelectorProps> = ({
    sizes,
    selectedSize,
    onSelectedSize
}) => {
    return (
        <Stack
            direction={'row'}
            flexWrap={'wrap'}
            spacing={1}
        >
            {sizes.map((size) => (
                <Button
                    key={size}
                    onClick={() => onSelectedSize(size)}
                    variant={selectedSize === size ? 'contained' : 'outlined'}
                >
                    {size}
                </Button>
            ))}
        </Stack>
    )
}
