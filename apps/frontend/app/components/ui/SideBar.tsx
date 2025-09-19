import { Box, Stack, Typography } from "@mui/material";
import { type SvgIconComponent } from "@mui/icons-material";
import { Link, useLocation } from "react-router";

interface SidebarItem {
  name: string;
  icon: SvgIconComponent;
  path: string;
  id?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  sx?: Record<string, string | number>;
}

export default function Sidebar({ items, sx }: SidebarProps) {
  const location = useLocation();

  return (
    <Stack
      direction="column"
      sx={{
        background: "#2c3e50",
        color: "white",
        padding: 2,
        width: "250px",
        minHeight: "100vh",
        ...sx,
      }}
    >
      {items.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Box
            key={item.id || item.name || index}
            component={Link}
            to={item.path}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              padding: 1.5,
              marginBottom: 0.5,
              borderRadius: 1,
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              backgroundColor: isActive
                ? "rgba(255, 255, 255, 0.2)"
                : "transparent",
              borderLeft: isActive
                ? "4px solid #3498db"
                : "4px solid transparent",
              "&:hover": {
                backgroundColor: isActive
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(255, 255, 255, 0.1)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <IconComponent sx={{ fontSize: 20 }} />
            <Typography
              variant="body1"
              sx={{
                textTransform: "capitalize",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.name}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
}
