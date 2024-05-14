// common
import { MdOutlineFiberManualRecord } from "react-icons/md";

// sport
import { FaRunning, FaSwimmer, FaBiking } from "react-icons/fa";

// education
import { FaGuitar, FaBookOpen, FaLanguage } from "react-icons/fa";

// health
import { FaBed, FaSun, FaAppleAlt, FaShower, FaSmokingBan } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { MdNoDrinks } from "react-icons/md";

// additional icons
//sport
import { FaDumbbell, FaWalking, FaHiking, FaSkating, FaSnowboarding, FaBasketballBall, FaBowlingBall } from "react-icons/fa";
import { GrYoga } from "react-icons/gr";
import { GiMeditation } from "react-icons/gi";
import { PiBoxingGloveFill } from "react-icons/pi";

// education
import { FaLaptop, FaKeyboard, FaGraduationCap, FaChess, FaDrum, FaMitten, FaPen, FaMoneyBill, FaBtc } from "react-icons/fa";
import { PiTelevisionSimpleFill } from "react-icons/pi";

// health
import { FaBriefcaseMedical, FaHeartbeat, FaYinYang, FaCannabis, FaCoffee, FaCookieBite, FaEgg, FaDrumstickBite } from "react-icons/fa";
import { GiOppositeHearts } from "react-icons/gi";
import { MdMedicationLiquid } from "react-icons/md";

const icons = [
	// common
	['default', <MdOutlineFiberManualRecord />],

	// sport
	['running', <FaRunning />],
	['bike', <FaBiking />],
	['swimming', <FaSwimmer />],

	// education
	['book', <FaBookOpen />],
	['language', <FaLanguage />],
	['guitar', <FaGuitar />],

	// health
	['bed', <FaBed />],
	['sun', <FaSun />],
	['water', <IoIosWater />],
	['apple', <FaAppleAlt />],
	['shower', <FaShower />],
	['smokingBan', <FaSmokingBan />],
	['noDrinks', <MdNoDrinks />],

	// additional icons
	'Sport',
	['dumbbell', <FaDumbbell />],
	['boxingGlove', <PiBoxingGloveFill />],
	['walking', <FaWalking />],
	['hiking', <FaHiking />],
	['skating', <FaSkating />],
	['snowboarding', <FaSnowboarding />],
	['meditation', <GiMeditation />],
	['basketball', <FaBasketballBall />],
	['bowling', <FaBowlingBall />],
	['yoga', <GrYoga />],

	'Education',
	['laptop', <FaLaptop />],
	['television', <PiTelevisionSimpleFill />],
	['keyboard', <FaKeyboard />],
	['graduationCap', <FaGraduationCap />],
	['chess', <FaChess />],
	['drum', <FaDrum />],
	['mitten', <FaMitten />],
	['pen', <FaPen />],
	['money', <FaMoneyBill />],
	['btc', <FaBtc />],

	'Health',
	['briefcaseMedical', <FaBriefcaseMedical />],
	['heartBeat', <FaHeartbeat />],
	['oppositeHearts', <GiOppositeHearts />],
	['yinYang', <FaYinYang />],
	['cannabis', <FaCannabis />],
	['coffee', <FaCoffee />],
	['cookieBite', <FaCookieBite />],
	['egg', <FaEgg />],
	['drumstickBite', <FaDrumstickBite />],
	['medicationLiquid', <MdMedicationLiquid />],
];

export default icons;