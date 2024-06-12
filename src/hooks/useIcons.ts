import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import CloseIcon from "@mui/icons-material/Close"
import ConstructionIcon from "@mui/icons-material/Construction"
import SettingsIcon from "@mui/icons-material/Settings"
import CodeIcon from "@mui/icons-material/Code"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';

/**
 * A hook that provides access to specific SVG icons.
 *
 * @returns An object containing a set of SVG icons.
 */
export default function useIcons() {
  /* ARROWS */
  const ArrowLeft = ArrowBackIosNewIcon
  const ArrowRight = ArrowForwardIosIcon

  /* STATUS */
  const SuccessIcon = CheckCircleOutlineIcon
  const ErrorIcon = ErrorOutlineIcon
  const WarningIcon = WarningAmberIcon
  const NotificationIcon = NotificationsNoneIcon

  /* ACTION */
  const GoBackIcon = ArrowBackIcon
  const LikeIcon = ThumbUpIcon

  return {
    arrows: { ArrowLeft, ArrowRight },
    status: { SuccessIcon, ErrorIcon, WarningIcon, NotificationIcon, ConstructionIcon, LightModeIcon, LanguageIcon },
    action: { CloseIcon, SettingsIcon, GoBackIcon, LikeIcon },
    utils: { CodeIcon },
  }
}
