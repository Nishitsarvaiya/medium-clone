import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import PortableText from 'react-portable-text';
import { Header } from '../../components';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typings';

interface Props {
	post: Post;
}

function Post({ post }: Props) {
	const getFormattedDate = (date: string) => {
		let d = new Date(date);
		return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
	};
	return (
		<div>
			{/* <Header /> */}
			{/* <div className='w-full h-80 overflow-hidden'>
				<img className='w-full h-full object-cover object-center' src={urlFor(post.mainImage).url()!} alt='' />
			</div> */}
			<div className='min-h-screen max-w-[1500px] mx-auto'>
				<div className='w-full h-full flex justify-between'>
					<div className='border-r border-[rgb(230, 230, 230)] min-h-screen w-20 relative hidden lg:block'>
						<nav className='h-full'>
							<div className='h-screen sticky top-0'>
								<div className='py-10 flex justify-center'>
									<Link href='/'>
										<svg viewBox='0 0 1043.63 592.71' className='h-6 fill-black cursor-pointer'>
											<g data-name='Layer 2'>
												<g data-name='Layer 1'>
													<path d='M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94'></path>
												</g>
											</g>
										</svg>
									</Link>
								</div>
							</div>
						</nav>
					</div>
					<main className='flex-1'>
						<div className='mb-10'>
							<div className='flex justify-center'>
								<div className='max-w-[692px] w-full min-w-0 mx-6 lg:mx-8'>
									<article>
										<header className='mt-14 mb-20'>
											<div className='flex'>
												<div className='h-12 w-12 mr-4 rounded-full overflow-hidden'>
													<img src={urlFor(post.author.image).url()!} alt='' />
												</div>
												<div>
													<div className='text-md font-semibold text-gray-900 mb-2'>
														{post.author.name}
													</div>
													<div className='flex gap-2 items-center'>
														<div className='text-xs text-gray-500 font-medium'>
															{getFormattedDate(post._createdAt)}
														</div>
														<span className='text-xs text-gray-500'>·</span>
														<div className='text-xs text-gray-500 font-medium'>
															4 min read
														</div>
													</div>
												</div>
											</div>
										</header>
										<section className='mt-6'>
											<h1 className='text-6xl font-bold text-gray-900 mb-4'>{post.title}</h1>
											<h3 className='text-xl font-medium text-gray-600 mb-8'>
												{post.description}
											</h3>
											<div className='w-full h-[400px] overflow-hidden mb-10'>
												<img
													className='w-full h-full object-cover object-center'
													src={urlFor(post.mainImage).url()!}
													alt=''
												/>
											</div>
											<div>
												<PortableText
													dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
													projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
													content={post.body}
													serializers={{
														h1: (props: any) => (
															<h1
																className='text-4xl font-bold tracking-wide mt-10 mb-5'
																{...props}
															/>
														),
														h2: (props: any) => (
															<h2
																className='text-3xl font-bold tracking-wide mt-10 mb-5'
																{...props}
															/>
														),
														h3: (props: any) => (
															<h3 className='text-2xl font-bold mt-10 mb-5' {...props} />
														),
														h4: (props: any) => (
															<h4 className='text-xl font-bold mt-10 mb-5' {...props} />
														),
														ul: ({ children }: any) => (
															<ul className='list-disc my-5 ml-10'>{children}</ul>
														),
														li: ({ children }: any) => (
															<li className='text-md font-medium text-gray-600 mb-2'>
																{children}
															</li>
														),
														link: ({ children }: any) => (
															<a className='text-md font-medium text-blue-600 underline underline-offset-1 cursor-pointer mb-2'>
																{children}
															</a>
														),
														blockquote: ({ children }: any) => (
															<blockquote className='text-2xl text-center font-semibold text-gray-700 my-20 py-10 border-y border-gray-900/10'>
																{children}
															</blockquote>
														),
													}}
												/>
											</div>
										</section>
									</article>
								</div>
							</div>
						</div>
					</main>
					<div className='w-96 min-h-screen px-8 border-l border-[rgb(230, 230, 230)] hidden lg:block'>
						<div className='h-full w-full relative'>
							<div className='fixed top-0'>
								<div className='min-h-screen'>
									<div className='pt-40'>
										<div className='h-20 w-20 rounded-full overflow-hidden mb-4'>
											<img
												className='h-full w-full object-cover object-center'
												src={urlFor(post.author.image).url()!}
												alt=''
											/>
										</div>
										<div className='text-md font-semibold text-gray-900 mb-2'>
											{post.author.name}
										</div>
										<div className='text-sm font-medium text-gray-500'>
											<PortableText
												dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
												projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
												content={post.author.bio}
												serializers={{}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Post;

export const getStaticPaths = async () => {
	const query = `*[_type == 'post'] {
        _id,
        slug {
            current
        }
    }`;

	const posts = await sanityClient.fetch(query);

	const paths = posts.map((post: Post) => ({
		params: {
			slug: post.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == 'post' && slug.current == $slug][0] {
        _id,
        _createdAt,
        title,
        author -> {
            name,
            image,
            bio
        },
        'comments': *[
            _type == 'comment' &&
            post._ref == ^._id &&
            approved == true
        ],
        description,
        mainImage,
        slug,
        body
    }`;

	const post = await sanityClient.fetch(query, {
		slug: params?.slug,
	});

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post,
		},
		revalidate: 60, // update the cached version of the page every 60 seconds
	};
};
