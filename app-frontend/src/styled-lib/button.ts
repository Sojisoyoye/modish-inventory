import Button from '@mui/material/Button'
import styled from 'styled-components'

export const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
  ':hover': {
    color: theme.palette[color].main,
    backgroundColor: 'white',
  },
}))
