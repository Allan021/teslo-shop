import { useState, useEffect } from 'react';
import { PeopleOutline } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid, Select, MenuItem } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import { IUser, Role } from '../../interfaces';
import { LoadingPage } from '../../components/ui';
import tesloApi from '../../api/teslo';




const UsersPage = () => {
    const { data, error,isLoading } = useSWR<IUser[]>('/api/admin/users');
    const [ users, setUsers ] = useState<IUser[]>([]);


    useEffect(() => {
      if (data) {
          setUsers(data);
      }
    }, [data])
    

    const onRoleUpdated = async (id: string, newRole: Role) => {
        const prevUsers = users.map( user => ({
            ...user,
        }))

        const updatedUsers = users.map( user => ({
            ...user,
            role: id === user._id ? newRole : user.role
        }));

        try {
            
            console.log('id', id)
            console.log('newRole', newRole)
            const resp = await tesloApi.put(`/admin/users`, { 
                userId : id,
                role :newRole
            });

            if (resp.status === 201) {
                setUsers(updatedUsers);
            }

        } catch (error) {
            setUsers(prevUsers);
            
        }

    }


    if (isLoading) {
        return <LoadingPage/>
    }


    if ( !data && !error ) return (<></>);



   

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre completo', width: 300 },
        {
            field: 'role', 
            headerName: 'Rol', 
            width: 300,
            renderCell(params) {
               return (
                <Select
                        value={ params.value }
                        label="Rol"
                        onChange={ ({ target }) => onRoleUpdated( params.row.id, target.value ) }
                        sx={{ width: '300px' }}
                    >
                        <MenuItem value='admin'> Admin </MenuItem>
                        <MenuItem value='client'> Client </MenuItem>
                        <MenuItem value='seller'> Seller</MenuItem>
                        <MenuItem value='super-user'> Super User </MenuItem>
                    </Select>
               )
            }
        },
    ];

    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))


  return (
    <AdminLayout 
        title={'Usuarios'} 
        subtitle={'Mantenimiento de usuarios'}
        icon={ <PeopleOutline /> }
    >


        <Grid container className='fadeIn'
            mt={2}
        >
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>


    </AdminLayout>
  )
}

export default UsersPage