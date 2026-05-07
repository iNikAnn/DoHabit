import { IconType } from 'react-icons';
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
	{ iconTitle: 'default', category: 'Featured', icon: MdOutlineFiberManualRecord },
	{ iconTitle: 'sun', category: 'Featured', icon: FaSun },
	{ iconTitle: 'water', category: 'Featured', icon: IoIosWater },
	{ iconTitle: 'shower', category: 'Featured', icon: FaShower },
	{ iconTitle: 'yoga', category: 'Featured', icon: GrYoga },
	{ iconTitle: 'meditation', category: 'Featured', icon: GiMeditation },
	{ iconTitle: 'walking', category: 'Featured', icon: FaWalking },
	{ iconTitle: 'running', category: 'Featured', icon: FaRunning },
	{ iconTitle: 'book', category: 'Featured', icon: FaBookOpen },
	{ iconTitle: 'language', category: 'Featured', icon: FaLanguage },
	{ iconTitle: 'smokingBan', category: 'Featured', icon: FaSmokingBan },
	{ iconTitle: 'noDrinks', category: 'Featured', icon: MdNoDrinks },
	{ iconTitle: 'noAdultContent', category: 'Featured', icon: MdNoAdultContent },
	{ iconTitle: 'coffee', category: 'Featured', icon: FaCoffee },

	// Sport
	{ iconTitle: 'bike', category: 'Sport', icon: FaBiking },
	{ iconTitle: 'swimming', category: 'Sport', icon: FaSwimmer },
	{ iconTitle: 'boxingGlove', category: 'Sport', icon: PiBoxingGloveFill },
	{ iconTitle: 'hiking', category: 'Sport', icon: FaHiking },
	{ iconTitle: 'skating', category: 'Sport', icon: FaSkating },
	{ iconTitle: 'snowboarding', category: 'Sport', icon: FaSnowboarding },
	{ iconTitle: 'basketball', category: 'Sport', icon: FaBasketballBall },
	{ iconTitle: 'bowling', category: 'Sport', icon: FaBowlingBall },
	{ iconTitle: 'soccer', category: 'Sport', icon: FaFutbol },
	{ iconTitle: 'football', category: 'Sport', icon: FaFootballBall },
	{ iconTitle: 'pingpong', category: 'Sport', icon: FaTableTennis },
	{ iconTitle: 'stretching', category: 'Sport', icon: FaPrayingHands },
	{ iconTitle: 'muscle', category: 'Sport', icon: GiMuscleUp },
	{ iconTitle: 'dumbbell', category: 'Sport', icon: FaDumbbell },

	// Education
	{ iconTitle: 'guitar', category: 'Education', icon: FaGuitar },
	{ iconTitle: 'television', category: 'Education', icon: PiTelevisionSimpleFill },
	{ iconTitle: 'keyboard', category: 'Education', icon: FaKeyboard },
	{ iconTitle: 'graduationCap', category: 'Education', icon: FaGraduationCap },
	{ iconTitle: 'chess', category: 'Education', icon: FaChess },
	{ iconTitle: 'drum', category: 'Education', icon: FaDrum },
	{ iconTitle: 'mitten', category: 'Education', icon: FaMitten },
	{ iconTitle: 'pen', category: 'Education', icon: FaPen },
	{ iconTitle: 'money', category: 'Education', icon: FaMoneyBill },
	{ iconTitle: 'btc', category: 'Education', icon: FaBtc },
	{ iconTitle: 'code', category: 'Education', icon: FaCode },
	{ iconTitle: 'music', category: 'Education', icon: FaMusic },
	{ iconTitle: 'paint', category: 'Education', icon: FaPaintBrush },
	{ iconTitle: 'work', category: 'Education', icon: MdWork },

	// Health
	{ iconTitle: 'briefcaseMedical', category: 'Health', icon: FaBriefcaseMedical },
	{ iconTitle: 'oppositeHearts', category: 'Health', icon: GiOppositeHearts },
	{ iconTitle: 'yinYang', category: 'Health', icon: FaYinYang },
	{ iconTitle: 'cannabis', category: 'Health', icon: FaCannabis },
	{ iconTitle: 'cookieBite', category: 'Health', icon: FaCookieBite },
	{ iconTitle: 'egg', category: 'Health', icon: FaEgg },
	{ iconTitle: 'drumstickBite', category: 'Health', icon: FaDrumstickBite },
	{ iconTitle: 'medicationLiquid', category: 'Health', icon: MdMedicationLiquid },
	{ iconTitle: 'brain', category: 'Health', icon: FaBrain },
	{ iconTitle: 'tooth', category: 'Health', icon: FaTooth },
	{ iconTitle: 'stethoscope', category: 'Health', icon: GiStethoscope },
	{ iconTitle: 'heartBeat', category: 'Health', icon: FaHeartbeat },
	{ iconTitle: 'bed', category: 'Health', icon: FaBed },
	{ iconTitle: 'apple', category: 'Health', icon: FaAppleAlt },
];

export const HABIT_ICONS_MAP = keyBy(HABIT_ICONS, (icon) => icon.iconTitle);