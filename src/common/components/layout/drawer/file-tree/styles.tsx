import { alpha, styled } from '@mui/material';
import ListItemBase from '@mui/material/ListItem';
import ListItemButtonBase from '@mui/material/ListItemButton';

export const ListItem = styled(ListItemBase)`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  padding-right: 0;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
`;

export const ListItemButton = styled(ListItemButtonBase)(({ theme }) => ({
  paddingLeft: 12,
  paddingRight: 12,
  marginLeft: -6,
  width: '100%',
  '&.Mui-selected, :hover': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.light, 0.1),
  },
}));
