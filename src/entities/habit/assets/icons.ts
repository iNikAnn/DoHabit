import { type IconType } from 'react-icons';
import { keyBy } from 'es-toolkit';

import {
	FaRunning, FaDumbbell, FaWalking, FaBookOpen, FaMoneyBill,
	FaBed, FaAppleAlt, FaCoffee, FaSun, FaHeartbeat, FaBiking, FaSwimmer,
	FaHiking, FaSkating, FaSnowboarding, FaBasketballBall, FaBowlingBall,
	FaLanguage, FaGuitar, FaKeyboard, FaGraduationCap, FaChess, FaDrum,
	FaMitten, FaPen, FaBtc, FaShower, FaSmokingBan, FaBriefcaseMedical,
	FaYinYang, FaCannabis, FaCookieBite, FaEgg, FaDrumstickBite,
	FaFutbol, FaTableTennis, FaPrayingHands, FaCode, FaMusic,
	FaPaintBrush, FaBrain, FaTooth,
	FaFootballBall
} from 'react-icons/fa';
import {
	MdOutlineFiberManualRecord, MdNoDrinks, MdMedicationLiquid, MdWork,
	MdNoAdultContent,
} from 'react-icons/md';
import { GiMeditation, GiOppositeHearts, GiStethoscope, GiMuscleUp } from 'react-icons/gi';
import { IoIosWater } from 'react-icons/io';
import { PiBoxingGloveFill, PiTelevisionSimpleFill } from 'react-icons/pi';
import { GrYoga } from 'react-icons/gr';

interface HabitIcon {
	iconTitle: string;
	category: string;
	icon: IconType;
}

/**
 * Habit icons library.
 */
export const HABIT_ICONS: HabitIcon[] = [
	// Featured
	{ iconTitle: 'default', category: 'featured', icon: MdOutlineFiberManualRecord },
	{ iconTitle: 'sun', category: 'featured', icon: FaSun },
	{ iconTitle: 'water', category: 'featured', icon: IoIosWater },
	{ iconTitle: 'shower', category: 'featured', icon: FaShower },
	{ iconTitle: 'yoga', category: 'featured', icon: GrYoga },
	{ iconTitle: 'meditation', category: 'featured', icon: GiMeditation },
	{ iconTitle: 'walking', category: 'featured', icon: FaWalking },
	{ iconTitle: 'running', category: 'featured', icon: FaRunning },
	{ iconTitle: 'book', category: 'featured', icon: FaBookOpen },
	{ iconTitle: 'language', category: 'featured', icon: FaLanguage },
	{ iconTitle: 'smokingBan', category: 'featured', icon: FaSmokingBan },
	{ iconTitle: 'noDrinks', category: 'featured', icon: MdNoDrinks },
	{ iconTitle: 'noAdultContent', category: 'featured', icon: MdNoAdultContent },
	{ iconTitle: 'coffee', category: 'featured', icon: FaCoffee },

	// Sport
	{ iconTitle: 'bike', category: 'sport', icon: FaBiking },
	{ iconTitle: 'swimming', category: 'sport', icon: FaSwimmer },
	{ iconTitle: 'boxingGlove', category: 'sport', icon: PiBoxingGloveFill },
	{ iconTitle: 'hiking', category: 'sport', icon: FaHiking },
	{ iconTitle: 'skating', category: 'sport', icon: FaSkating },
	{ iconTitle: 'snowboarding', category: 'sport', icon: FaSnowboarding },
	{ iconTitle: 'basketball', category: 'sport', icon: FaBasketballBall },
	{ iconTitle: 'bowling', category: 'sport', icon: FaBowlingBall },
	{ iconTitle: 'soccer', category: 'sport', icon: FaFutbol },
	{ iconTitle: 'football', category: 'sport', icon: FaFootballBall },
	{ iconTitle: 'pingpong', category: 'sport', icon: FaTableTennis },
	{ iconTitle: 'stretching', category: 'sport', icon: FaPrayingHands },
	{ iconTitle: 'muscle', category: 'sport', icon: GiMuscleUp },
	{ iconTitle: 'dumbbell', category: 'sport', icon: FaDumbbell },

	// Education
	{ iconTitle: 'guitar', category: 'education', icon: FaGuitar },
	{ iconTitle: 'television', category: 'education', icon: PiTelevisionSimpleFill },
	{ iconTitle: 'keyboard', category: 'education', icon: FaKeyboard },
	{ iconTitle: 'graduationCap', category: 'education', icon: FaGraduationCap },
	{ iconTitle: 'chess', category: 'education', icon: FaChess },
	{ iconTitle: 'drum', category: 'education', icon: FaDrum },
	{ iconTitle: 'mitten', category: 'education', icon: FaMitten },
	{ iconTitle: 'pen', category: 'education', icon: FaPen },
	{ iconTitle: 'money', category: 'education', icon: FaMoneyBill },
	{ iconTitle: 'btc', category: 'education', icon: FaBtc },
	{ iconTitle: 'code', category: 'education', icon: FaCode },
	{ iconTitle: 'music', category: 'education', icon: FaMusic },
	{ iconTitle: 'paint', category: 'education', icon: FaPaintBrush },
	{ iconTitle: 'work', category: 'education', icon: MdWork },

	// Health
	{ iconTitle: 'briefcaseMedical', category: 'health', icon: FaBriefcaseMedical },
	{ iconTitle: 'oppositeHearts', category: 'health', icon: GiOppositeHearts },
	{ iconTitle: 'yinYang', category: 'health', icon: FaYinYang },
	{ iconTitle: 'cannabis', category: 'health', icon: FaCannabis },
	{ iconTitle: 'cookieBite', category: 'health', icon: FaCookieBite },
	{ iconTitle: 'egg', category: 'health', icon: FaEgg },
	{ iconTitle: 'drumstickBite', category: 'health', icon: FaDrumstickBite },
	{ iconTitle: 'medicationLiquid', category: 'health', icon: MdMedicationLiquid },
	{ iconTitle: 'brain', category: 'health', icon: FaBrain },
	{ iconTitle: 'tooth', category: 'health', icon: FaTooth },
	{ iconTitle: 'stethoscope', category: 'health', icon: GiStethoscope },
	{ iconTitle: 'heartBeat', category: 'health', icon: FaHeartbeat },
	{ iconTitle: 'bed', category: 'health', icon: FaBed },
	{ iconTitle: 'apple', category: 'health', icon: FaAppleAlt },
];

export const HABIT_ICONS_MAP = keyBy(HABIT_ICONS, (icon) => icon.iconTitle);