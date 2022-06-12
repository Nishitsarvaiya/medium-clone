import Head from 'next/head';
import Link from 'next/link';
import { Header } from '../components';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';

interface Props {
	posts: [Post];
}

export default function Home({ posts }: Props) {
	const getFormattedDate = (date: string) => {
		let d = new Date(date);
		return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
	};
	return (
		<div className='site'>
			<Head>
				<title>Nishit's Blog</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='layout'>
				<Header />
				<div className='w-full bg-[#FFC017]  border-b border-stone-900'>
					<div className='max-w-[1192px] mx-auto'>
						<div className='py-24 mx-6 lg:mx-4 xl:mx-0 flex flex-col'>
							<h2 className='text-7xl md:text-8xl lg:text-9xl font-serif tracking-tight mb-10'>
								Stay Curious
							</h2>
							<h3 className='text-2xl tracking-tight'>
								Discover stories, thinking, and expertise from writers on any topic.
							</h3>
						</div>
					</div>
				</div>
				<div className='max-w-[1192px] mx-auto'>
					<div className='py-10 mx-6 lg:mx-4 xl:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{posts.map((post) => (
							<Link href={`/post/${post.slug.current}`} key={post._id}>
								<div className='border border-slate-900/10 rounded-xl overflow-hidden hover:shadow-2xl hover:translate-y-[-5px] transition duration-300 ease-in-out group cursor-pointer flex flex-col'>
									<div className='h-60 w-full overflow-hidden'>
										<img
											className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
											src={urlFor(post.mainImage).url()!}
											alt=''
										/>
									</div>
									<div className='p-4 flex-1 flex flex-col justify-between gap-6'>
										<div>
											<h2 className='text-2xl font-bold mb-2 text-gray-900'>{post.title}</h2>
											<p className='text-sm font-medium text-gray-600'>{post.description}</p>
										</div>
										<div className='flex items-center justify-between gap-3 flex-wrap'>
											<div className='flex items-center gap-3'>
												<img
													className='h-10 w-10 object-cover rounded-lg'
													src={urlFor(post.author.image).url()!}
													alt=''
												/>
												<span className='text-xs font-medium text-slate-600'>
													{post.author.name}
												</span>
											</div>
											<div>
												<span className='text-xs font-medium text-slate-600'>
													{getFormattedDate(post._createdAt)}
												</span>
											</div>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = async () => {
	const query = `*[_type == 'post'] {
		_id,
		title,
		author -> {
			name,
			image,
		},
		description,
		mainImage,
		slug,
		_createdAt
	}`;

	const posts = await sanityClient.fetch(query);

	return {
		props: {
			posts,
		},
	};
};
