// common
import { MdOutlineFiberManualRecord } from "react-icons/md";

// sport
import { MdSportsBaseball } from "react-icons/md";
import { GrYoga } from "react-icons/gr";
import { LuBike } from "react-icons/lu";

// education
import { IoBook } from "react-icons/io5";
import { IoLanguage } from "react-icons/io5";
import { FaGuitar } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";

// health
import { FaBed } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import { IoIosWater } from "react-icons/io";
import { FaAppleAlt } from "react-icons/fa";
import { FaShower } from "react-icons/fa6";
import { FaSmokingBan } from "react-icons/fa";
import { MdNoDrinks } from "react-icons/md";


const icons = [
	// common
	['default', <MdOutlineFiberManualRecord />],

	// sport
	['baseball', <MdSportsBaseball />],
	['yoga', <GrYoga />],
	['bike', <LuBike />],

	// education
	['book', <IoBook />],
	['language', <IoLanguage />],
	['guitar', <FaGuitar />],
	// ['colorPalette', <IoIosColorPalette />],

	// health
	['bed', <FaBed />],
	['sun', <FaSun />],
	['water', <IoIosWater />],
	['apple', <FaAppleAlt />],
	['shower', <FaShower />],
	['smokingBan', <FaSmokingBan />],
	['noDrinks', <MdNoDrinks />],
];

export default icons;