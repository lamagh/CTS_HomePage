import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Edit,
  EditLocation,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { ClearIcon } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const StyledChip = styled(Chip)({
  "&.MuiChip-root": {
    backgroundColor: "#eee",
    borderRadius: "16px",
    paddingRight: "8px",
  },
  ".MuiChip-label": {
    paddingRight: "0",
  },
});

const StyledIconButton = styled(IconButton)({
  padding: "2px",
  color: "#0363C4",
  "&:hover": {
    backgroundColor: "rgba(3, 99, 196, 0.04)",
  },
});

export default function MultipleSelectInput({
  options: oldOptions,
  value,
  onChange,
  onDelete,
  label,
  api,
  editLink,
}) {
  const router = useNavigate();
  const authHeader = useAuthHeader();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(!api ? oldOptions : []);
  const [loading, setLoading] = useState(false);

  console.error(value);

  const handleEdit = (option) => {
    router(`${editLink}/${option.slug}`);
  };

  const handleDelete = (option) => {
    onDelete(option);
  };

  const handleOpen = async () => {
    setOpen(true);

    if (!api) {
      setOptions([...oldOptions]);
      return;
    } else if (options.length > 0) {
      return;
    }

    (async () => {
      setLoading(true);

      let resp = await fetch(api, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      let data = await resp.json();
      setLoading(false);

      setOptions([...data]);
    })();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FormControl fullWidth>
        <Autocomplete
          fullWidth
          id={label}
          value={value || []}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={(e, value) => onChange(value)}
          disableCloseOnSelect={true}
          isOptionEqualToValue={(option, value) => {
            return option.title === value.title;
          }}
          getOptionLabel={(option) => {
            return option.title;
          }}
          options={options}
          loading={loading}
          multiple={true}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.id}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const chipProps = getTagProps({ index });
              const { onDelete, ...otherChipProps } = chipProps;

              return (
                <Tooltip title={`${option.title}`} key={option.title}>
                  <StyledChip
                    {...otherChipProps}
                    variant="filled"
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>{`${option.title}`}</span>
                        <Stack direction="row" spacing={0.5}>
                          {editLink && (
                            <StyledIconButton
                              size="small"
                              onClick={() => handleEdit(option)}
                            >
                              <Edit fontSize="small" color="success" />
                            </StyledIconButton>
                          )}
                          <StyledIconButton
                            size="small"
                            onClick={() => handleDelete(option)}
                          >
                            <ClearIcon fontSize="small" color="error" />
                          </StyledIconButton>
                        </Stack>
                      </Stack>
                    }
                  />
                </Tooltip>
              );
            })
          }
        />
      </FormControl>
    </div>
  );
}
