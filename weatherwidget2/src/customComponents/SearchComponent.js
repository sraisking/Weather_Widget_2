import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";

const SearchComponent = ({ onClick }) => {
    const [city, setCity] = useState(null);
    const handleClick = () => {
        onClick(city)
    }
    const onChange = ({ target: { value } }) => {
        setCity(value)
    }
    return (
        <TextField
            label="Search By City"
            id="searchbox"
            onChange={onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment onClick={handleClick} position="start">
                        <IconButton id="searchbtn">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}
export default SearchComponent