// This file kills the old service worker.
// Delete it after everything is updated.
self.registration.unregister().then((success) => {
	if (success) {
		console.log('Old SW unregistered successfully.');
	} else {
		console.log('Failed to unregister SW.');
	}
});