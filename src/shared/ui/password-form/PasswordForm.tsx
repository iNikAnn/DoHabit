import styles from './PasswordForm.module.css';
import { useState, type SubmitEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, useDialogStore } from '@shared/ui';

interface PasswordFormProps {
	minLength?: number;
	required?: boolean;
	submitLabel?: string;
	onSubmit: (password?: string) => void;
	onClose?: () => void;
}

/**
 * Password input form.
 */
function PasswordForm(props: PasswordFormProps) {
	const {
		minLength = 6,
		required = true,
		submitLabel,
		onSubmit,
		onClose
	} = props;

	const { t } = useTranslation();
	const closeDialog = useDialogStore((s) => s.close);

	const [password, setPassword] = useState('');
	const [isVisible, setIsVisible] = useState(false);

	const trimmedPassword = password.trim();

	// Valid if empty when optional, or meets minimum length when provided
	const isValid = required
		? trimmedPassword.length >= minLength
		: trimmedPassword.length === 0 || trimmedPassword.length >= minLength;

	const handleSubmit: SubmitEventHandler = (e) => {
		e.preventDefault();
		setIsVisible(false);
		onSubmit(trimmedPassword);
		setPassword('');
		closeDialog();
	};

	const handleClose = () => {
		closeDialog();
		onClose?.();
	};

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}
		>
			<div className={styles.inputWrapper}>
				{/* https://www.chromium.org/developers/design-documents/create-amazing-password-forms/ */}
				<input
					type='text'
					name='username'
					autoComplete='off'
					readOnly
					hidden
					style={{ display: 'none' }}
				/>

				<input
					type={isVisible ? 'text' : 'password'}
					name='backup-code'
					autoComplete='one-time-code'
					value={password}
					className={styles.input}
					onChange={(e) => setPassword(e.target.value)}
					placeholder={t('common.password')}
				/>

				<Button
					variant='secondary'
					onClick={() => setIsVisible(!isVisible)}
					disabled={!password}
				>
					{isVisible ? <FaEyeSlash /> : <FaEye />}
				</Button>
			</div>

			<div className={styles.buttons}>
				<Button
					variant='secondary'
					onClick={handleClose}
				>
					{t('common.cancel')}
				</Button>

				<Button
					type='submit'
					disabled={!isValid}
				>
					{submitLabel ?? 'OK'}
				</Button>
			</div>
		</form>
	);
}

export { PasswordForm };