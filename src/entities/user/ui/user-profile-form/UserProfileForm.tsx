import styles from './UserProfileForm.module.css';
import { useState, type SubmitEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../model/store';
import { Button, SectionHeader, useDialogStore } from '@shared/ui';

/**
 * Form component for editing user avatar URL and username.
 */
function UserProfileForm() {
	const { t } = useTranslation();
	const closeDialog = useDialogStore((s) => s.close);

	const user = useUserStore((s) => s.user);
	const updateUser = useUserStore((s) => s.updateUser);

	const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl ?? '');
	const [username, setUsername] = useState<string>(user.username ?? '');

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		updateUser({
			avatarUrl: avatarUrl || undefined,
			username: username || undefined
		});

		closeDialog();
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<SectionHeader
					title={t('user.avatarUrl')}
					extra={(
						<Button
							variant='text'
							onClick={() => setAvatarUrl('')}
							disabled={!avatarUrl}
						>
							{t('common.clear')}
						</Button>
					)}
					className={styles.inputHeader}
				/>

				<input
					type='url'
					name='avatarUrl'
					id='avatarUrl'
					value={avatarUrl}
					onChange={(e) => setAvatarUrl(e.target.value)}
					placeholder={t('user.avatarUrlPlaceholder')}
					className={styles.input}
					autoComplete='off'
				/>
			</div>

			<div className={styles.field}>
				<SectionHeader
					title={t('user.username')}
					description={t('user.usernameHint')}
					extra={(
						<Button
							variant='text'
							onClick={() => setUsername('')}
							disabled={!username}
						>
							{t('common.clear')}
						</Button>
					)}
					className={styles.inputHeader}
				/>

				<input
					type='text'
					name='username'
					id='username'
					pattern='[a-zA-Z0-9_\-]+'
					minLength={2}
					maxLength={20}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder={t('user.usernamePlaceholder')}
					className={styles.input}
					autoComplete='off'
				/>
			</div>

			<div className={styles.actions}>
				<Button
					variant='secondary'
					className={styles.cancelButton}
					onClick={closeDialog}
				>
					{t('common.cancel')}
				</Button>

				<Button
					type='submit'
					className={styles.submitButton}
				>
					{t('common.ok')}
				</Button>
			</div>
		</form>
	);
}

export { UserProfileForm };