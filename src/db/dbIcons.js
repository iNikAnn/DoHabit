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
import { FaWalking, FaHiking, FaSkating, FaSnowboarding, FaBasketballBall } from "react-icons/fa";
import { GrYoga } from "react-icons/gr";
import { GiMeditation } from "react-icons/gi";

// education
import { FaLaptop, FaKeyboard, FaGraduationCap, FaChess, FaDrum, FaMitten, FaPen } from "react-icons/fa";

// health
import { FaHeartbeat, FaYinYang, FaCannabis, FaCoffee, FaCookieBite, FaEgg, FaDrumstickBite } from "react-icons/fa";

const icons = [
	// common
	['default', <MdOutlineFiberManualRecord />],

	// sport
	['Running', <FaRunning />],
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
	['walking', <FaWalking />],
	['hiking', <FaHiking />],
	['skating', <FaSkating />],
	['snowboarding', <FaSnowboarding />],
	['meditation', <GiMeditation />],
	['basketball', <FaBasketballBall />],
	['yoga', <GrYoga />],

	'Education',
	['Laptop', <FaLaptop />],
	['keyboard', <FaKeyboard />],
	['graduationCap', <FaGraduationCap />],
	['chess', <FaChess />],
	['drum', <FaDrum />],
	['mitten', <FaMitten />],
	['pen', <FaPen />],

	'Health',
	['heartBeat', <FaHeartbeat />],
	['yinYang', <FaYinYang />],
	['cannabis', <FaCannabis />],
	['coffee', <FaCoffee />],
	['cookieBite', <FaCookieBite />],
	['egg', <FaEgg />],
	['drumstickBite', <FaDrumstickBite />],
];

export default icons;