import { InputAdornment, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
    const { keyword: urlKeyword } = useParams<{ keyword?: string }>();
    const [keyword, setKeyword] = useState(urlKeyword ? decodeURIComponent(urlKeyword) : '');
    const navigate = useNavigate();

    useEffect(() => {
        if (urlKeyword) {
            setKeyword(decodeURIComponent(urlKeyword));
        } else {
            setKeyword('');
        }
    }, [urlKeyword]);

    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setKeyword(value);
        if (value.trim()) {
            navigate(`/search/${encodeURIComponent(value.trim())}`);
        } else {
            navigate('/search');
        }
    };

    return (
        <TextField
            value={keyword}
            onChange={handleSearchKeyword}
            placeholder="What do you want to play?"
            sx={{
                width: '100%',
                maxWidth: '400px',
                marginRight: '16px',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '100px',
                    height: '48px',
                },
            }}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default Searchbar;