import React, { FC, useEffect, useState } from 'react'
import { AdminLayout } from '../../../components/layouts'
import { IProduct } from '../../../interfaces';
import { AddOutlined, DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid,  Radio, RadioGroup, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { dbProducts } from '../../../database';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { tesloApi } from '../../../api';
import { Product } from '../../../models';


const validTypes = ['shirts', 'pants', 'hoodies', 'hats']
const validGender = ['men', 'women', 'kid', 'unisex']
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
interface FormData {
    _id?       : string;
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    sizes      : string[];
    slug       : string;
    tags       : string[];
    title      : string;
    type       : string;
    gender     : string;
}

interface Props {
    product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {

    const router = useRouter();

    const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    })

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [ newTagValue, setNewTagValue ] = useState('');
    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        setNewTagValue('');
        const currentTags = getValues('tags');

        if ( currentTags.includes(newTag) ) {
            return;
        }

        currentTags.push(newTag);
    }

    const onDeleteTag = ( tag: string ) => {
        const updatedTags = getValues('tags').filter( t => t !== tag );
        setValue('tags', updatedTags, { shouldValidate: true });
    }

    
    useEffect(() => {
        const subscription = watch(( value, { name, type } ) => {
            if ( name === 'title' ) {
                const newSlug = value.title?.trim()
                      .replaceAll(' ', '_')
                      .replaceAll("'", '')
                      .toLocaleLowerCase() || '';
  
                 setValue('slug', newSlug);
            }
        });
        return () => subscription.unsubscribe();
      }, [watch, setValue])
      


    const onSubmit = async(form: FormData) => {
        
 

        if (form.images.length < 2) {
            return;
        }

        setIsSaving(true);

        
        try {
            const {data} = await tesloApi({
                method: form._id ? 'PUT' : 'POST',
                url: `/admin/products`,
                data: form
            } );

            if (data._id) {
                router.replace(`/admin/products`);
            }else{
             setIsSaving(false);
            }
            
        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }
    }

    const onChangeSize = ( size: string ) => {
        const currentSizes = getValues('sizes');
        if ( currentSizes.includes( size ) ) {
            return setValue('sizes', currentSizes.filter( s => s !== size ), { shouldValidate: true } );
        }

        setValue('sizes', [ ...currentSizes, size ], { shouldValidate: true });

    }

    const onDeleteImage = ( image: string) =>{
        setValue(
            'images', 
            getValues('images').filter( img => img !== image ),
            { shouldValidate: true }
        );
    }




    const onChangeImage =async ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const files = event.target.files;
        if ( !files  || files.length === 0 ) {
            return;
        }


        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'teslo-store');
    
                const { data } = await tesloApi.post<{ message: string}>('/admin/upload', formData);
    
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
    
                
            } 
        } catch (error) {
            console.log(error);
        }

       

    }
    return (
        <AdminLayout 
            title= { 'Producto'}
            subtitle = {`${
                product._id ? `Editando: ${product.title}` : 'Crear Producto'
            }`}
            icon = { 
                product._id ? <DriveFileRenameOutline /> : <AddOutlined />
             }
        >
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            >
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={ isSaving }
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                    <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                onChange={ (e) => setValue('type', e.target.value,{
                                    shouldValidate: true,
                                }) }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues("gender")}
                                onChange={ (e) => setValue('gender', e.target.value,{
                                    shouldValidate: true,
                                }) }

                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel
                                        key={size}
                                        control={ <Checkbox checked={ getValues('sizes').includes(size) } />} 
                                        label={ size } 
                                        onChange={ () => onChangeSize( size )  }
                                    />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim().includes(' ') ? 'No puede tener espacios en blanco':undefined
                            })}
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            value={ newTagValue }
                            onChange={ ({ target }) => setNewTagValue(target.value) }
                            onKeyUp={ ({ code })=> code === 'Space' ? onNewTag() : undefined }
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current && fileInputRef.current.click() }
                            >
                                Cargar imagen
                            </Button>

                            <input type="file"
                                multiple
                                accept="image/png, image/jpeg , image/jpg"
                                style={{ display: 'none' }}
                                ref={ fileInputRef }
                                onChange={ onChangeImage }
                            />

                            
                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('images').length < 2 ? 'flex': 'none' }}
                            />

                            <Grid container spacing={2}
                                mt={2}
                            >
                                 {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={ () => onDeleteImage(img) }
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
   

    )
}



export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;
    
    let product:IProduct | null;

    if (slug==="new") {
        const tempProduct = JSON.parse(JSON.stringify(new Product()))
        delete tempProduct._id;
        product = tempProduct;
    }else{
        product = await dbProducts.getProductsBySlug(slug.toString());
    }

       
    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage