import { IconType } from 'react-icons';

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
	Icon: IconType;
}

/**
 * Habit icons library.
 */
export const HABIT_ICONS: HabitIcon[] = [
	// Featured
	{ iconTitle: 'default', category: 'Featured', Icon: MdOutlineFiberManualRecord },
	{ iconTitle: 'sun', category: 'Featured', Icon: FaSun },
	{ iconTitle: 'water', category: 'Featured', Icon: IoIosWater },
	{ iconTitle: 'shower', category: 'Featured', Icon: FaShower },
	{ iconTitle: 'yoga', category: 'Featured', Icon: GrYoga },
	{ iconTitle: 'meditation', category: 'Featured', Icon: GiMeditation },
	{ iconTitle: 'walking', category: 'Featured', Icon: FaWalking },
	{ iconTitle: 'running', category: 'Featured', Icon: FaRunning },
	{ iconTitle: 'book', category: 'Featured', Icon: FaBookOpen },
	{ iconTitle: 'language', category: 'Featured', Icon: FaLanguage },
	{ iconTitle: 'smokingBan', category: 'Featured', Icon: FaSmokingBan },
	{ iconTitle: 'noDrinks', category: 'Featured', Icon: MdNoDrinks },
	{ iconTitle: 'noAdultContent', category: 'Featured', Icon: MdNoAdultContent },
	{ iconTitle: 'coffee', category: 'Featured', Icon: FaCoffee },

	// Sport
	{ iconTitle: 'bike', category: 'Sport', Icon: FaBiking },
	{ iconTitle: 'swimming', category: 'Sport', Icon: FaSwimmer },
	{ iconTitle: 'boxingGlove', category: 'Sport', Icon: PiBoxingGloveFill },
	{ iconTitle: 'hiking', category: 'Sport', Icon: FaHiking },
	{ iconTitle: 'skating', category: 'Sport', Icon: FaSkating },
	{ iconTitle: 'snowboarding', category: 'Sport', Icon: FaSnowboarding },
	{ iconTitle: 'basketball', category: 'Sport', Icon: FaBasketballBall },
	{ iconTitle: 'bowling', category: 'Sport', Icon: FaBowlingBall },
	{ iconTitle: 'soccer', category: 'Sport', Icon: FaFutbol },
	{ iconTitle: 'football', category: 'Sport', Icon: FaFootballBall },
	{ iconTitle: 'pingpong', category: 'Sport', Icon: FaTableTennis },
	{ iconTitle: 'stretching', category: 'Sport', Icon: FaPrayingHands },
	{ iconTitle: 'muscle', category: 'Sport', Icon: GiMuscleUp },
	{ iconTitle: 'dumbbell', category: 'Sport', Icon: FaDumbbell },

	// Education
	{ iconTitle: 'guitar', category: 'Education', Icon: FaGuitar },
	{ iconTitle: 'television', category: 'Education', Icon: PiTelevisionSimpleFill },
	{ iconTitle: 'keyboard', category: 'Education', Icon: FaKeyboard },
	{ iconTitle: 'graduationCap', category: 'Education', Icon: FaGraduationCap },
	{ iconTitle: 'chess', category: 'Education', Icon: FaChess },
	{ iconTitle: 'drum', category: 'Education', Icon: FaDrum },
	{ iconTitle: 'mitten', category: 'Education', Icon: FaMitten },
	{ iconTitle: 'pen', category: 'Education', Icon: FaPen },
	{ iconTitle: 'money', category: 'Education', Icon: FaMoneyBill },
	{ iconTitle: 'btc', category: 'Education', Icon: FaBtc },
	{ iconTitle: 'code', category: 'Education', Icon: FaCode },
	{ iconTitle: 'music', category: 'Education', Icon: FaMusic },
	{ iconTitle: 'paint', category: 'Education', Icon: FaPaintBrush },
	{ iconTitle: 'work', category: 'Education', Icon: MdWork },

	// Health
	{ iconTitle: 'briefcaseMedical', category: 'Health', Icon: FaBriefcaseMedical },
	{ iconTitle: 'oppositeHearts', category: 'Health', Icon: GiOppositeHearts },
	{ iconTitle: 'yinYang', category: 'Health', Icon: FaYinYang },
	{ iconTitle: 'cannabis', category: 'Health', Icon: FaCannabis },
	{ iconTitle: 'cookieBite', category: 'Health', Icon: FaCookieBite },
	{ iconTitle: 'egg', category: 'Health', Icon: FaEgg },
	{ iconTitle: 'drumstickBite', category: 'Health', Icon: FaDrumstickBite },
	{ iconTitle: 'medicationLiquid', category: 'Health', Icon: MdMedicationLiquid },
	{ iconTitle: 'brain', category: 'Health', Icon: FaBrain },
	{ iconTitle: 'tooth', category: 'Health', Icon: FaTooth },
	{ iconTitle: 'stethoscope', category: 'Health', Icon: GiStethoscope },
	{ iconTitle: 'heartBeat', category: 'Health', Icon: FaHeartbeat },
	{ iconTitle: 'bed', category: 'Health', Icon: FaBed },
	{ iconTitle: 'apple', category: 'Health', Icon: FaAppleAlt },
];