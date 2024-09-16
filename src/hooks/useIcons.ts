import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import CloseIcon from "@mui/icons-material/Close"
import SettingsIcon from "@mui/icons-material/Settings"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import GitHubIcon from "@mui/icons-material/GitHub"
import CheckIcon from "@mui/icons-material/Check"
import { MdDarkMode } from "react-icons/md"
import { IoIosGlobe } from "react-icons/io"
import { FaReact } from "react-icons/fa"
import { TbBrandNextjs } from "react-icons/tb"
import { IoLogoJavascript } from "react-icons/io"
import { SiTypescript } from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { TbBrandMongodb } from "react-icons/tb"
import { TbSql } from "react-icons/tb"
import { FaNodeJs } from "react-icons/fa"
import { FaGitAlt } from "react-icons/fa"
import { FaAws } from "react-icons/fa"
import { DiScrum } from "react-icons/di"
import { AiOutlinePython } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";




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
  const Checked = CheckIcon
  const User = AiOutlineUser
  const LoginIcon = IoMdLogIn
  const LogoutIcon = IoMdLogOut

  /* ACTION */
  const GoBackIcon = ArrowBackIcon
  const GoNextIcon = ArrowForwardIcon
  const LikeIcon = ThumbUpIcon
  const DarkMode = MdDarkMode
  const Globe = IoIosGlobe

  /* DEV ICONS */
  const ReactIcon = FaReact
  const NextIcon = TbBrandNextjs
  const JsIcon = IoLogoJavascript
  const TsIcon = SiTypescript
  const JavaIcon = FaJava
  const MongoIcon = TbBrandMongodb
  const SqlIcon = TbSql
  const NodeJsIcon = FaNodeJs
  const GitIcon = FaGitAlt
  const AwsIcon = FaAws
  const ScrumIcon = DiScrum
  const PythonIcon = AiOutlinePython
  const LinkedIn =  CiLinkedin
  const Email = AiOutlineMail
  

  return {
    arrows: { ArrowLeft, ArrowRight },
    status: { SuccessIcon, ErrorIcon, WarningIcon, NotificationIcon, Checked, User },
    action: { CloseIcon, SettingsIcon, GoBackIcon, GoNextIcon, LikeIcon, DarkMode, Globe, LoginIcon, LogoutIcon },
    dev: { ReactIcon, NextIcon, JsIcon, TsIcon, JavaIcon, MongoIcon, SqlIcon, NodeJsIcon, GitIcon, AwsIcon, ScrumIcon, PythonIcon, LinkedIn, GitHubIcon, Email },
  }
}
