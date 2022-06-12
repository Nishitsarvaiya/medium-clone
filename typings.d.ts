export interface Post {
	_id: string;
	_createdAt: string;
	title: string;
	mainImage: {
		asset: {
			url: string;
		};
	};
	description: string;
	author: {
		name: string;
		image: string;
		bio: [object];
	};
	slug: {
		current: string;
	};
	body: [object];
}
