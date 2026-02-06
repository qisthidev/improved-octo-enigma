export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const path = url.pathname;

		// Filter: Hanya urus rute /people/{id}
		const match = path.match(/^\/people\/([a-zA-Z0-9]+)$/);

		if (match) {
			const personId = match[1];
			const objectKey = `profiles/${personId}.html`; // Sesuaikan path di R2

			// Coba ambil dari R2
			const object = await env.BUCKET.get(objectKey);

			if (object) {
				const headers = new Headers();
				object.writeHttpMetadata(headers);
				headers.set("Content-Type", "text/html");
				headers.set("X-Served-By", "Anoman-R2-Edge"); // Biar kita tau ini dari R2

				return new Response(object.body, { headers });
			}
		}

		// Jika bukan /people atau file tidak ada di R2, teruskan ke server Dalang
		return fetch(request);
	},
};
