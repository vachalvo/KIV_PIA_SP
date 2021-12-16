import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Autocomplete, CircularProgress} from "@mui/material";
import {useState} from "react";
import UserService from "../../services/user-service";
import UserListItem from "./UserListItem";

export default function SearchBar(parentProps) {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    const fetchUsers = async (name) => {
        setLoading(true);
        const res = await UserService.findUsersByName(name);
        console.log(res.data);
        setLoading(false);
        editStructureOfItems(res.data);
    };

    const editStructureOfItems = (data) => {
        data.map((item) => {
            return {
                ...item,
                label: item.name
            };
        });
        setItems(data);
    }

    const fetchUser = async (id) => {
        // TODO - asi delete

        setOpen(false);

        const res = await UserService.getUser(id);
        console.log("Clicked user: ", res.data);
    }

    const _onChange = (event) => {
        const val = event.target.value;
        setValue(val);_checkValue(val);
    };

    const _checkValue = (val) => {
        if(val && val.length >= 3){
            setOpen(true);
            fetchUsers(val);
        }
    }

    const _onClear = () => {
        setItems([]);
        setOpen(false);
    }

    return (
        <>
            <Autocomplete
                disablePortal
                style={{padding: '0 0 20px 0'}}
                id="filled-search"
                fullWidth sx={{ m: 1 }}
                options={items}
                getOptionLabel={(item) => item.user.name + item.user.id}
                groupBy={(item) => item.user.name.charAt(0)}
                variant="filled"
                loading={loading}
                open={open}
                onOpen={() => {
                    _checkValue(value);
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                clearOnBlur
                renderInput={(params) => <TextField
                    {...params}
                    value={value}
                    onChange={_onChange}
                    label="Search"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />}
                renderOption={(props, option, { inputValue }) => {
                    return (
                        <div key={option} { ...props } onClick={() => { fetchUser(option.user.id) }}>
                            <UserListItem key={option.user.id} option={option} {...parentProps} onClear={_onClear}/>
                        </div>
                    );
                }}
            />
        </>
    );
}
