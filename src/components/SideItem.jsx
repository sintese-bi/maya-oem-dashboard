import { Link } from 'react-router-dom';

import { Box, Button, ListItem } from '@mui/material';

export const SideItem = (props) => {
	const { icon, title, active } = props;

	return (
		<ListItem
			disableGutters
			sx={{
				display:'flex',
				py: 0,
				px: 2,
			}}
		>
			<Button
				startIcon={icon}
				sx={{
          			backgroundColor: active && {
          			  xs: "rgba(255,255,255, 0.08)",
          			  lg: "none",
          			},
          			borderRadius: 1,
          			color: active
         			   ? "secondary.main"
          			  : { xs: "neutral.300", lg: "neutral.500" },
          			fontWeight: active && "fontWeightBold",
          			justifyContent: "flex-start",
          			px: 3,
          			textAlign: "left",
          			textTransform: "none",
          			width: "100%",
          			"& .MuiButton-startIcon": {
            		color: active ? "secondary.main" : "neutral.400",
          			},
          			"&:hover": {
            			backgroundColor: {
             				xs: "rgba(255,255,255, 0.08)",
              				lg: "neutral.100",
            			},
          			},
        		}}
			>
				<Box sx={{flexGrow: 1}}>{title}</Box>
			</Button>
		</ListItem>
	)
}