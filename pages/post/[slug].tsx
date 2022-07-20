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
		<div className='post-page'>
			<div className='min-h-screen max-w-[1500px] mx-auto'>
				<div className='w-full h-full flex justify-between'>
					<div className='border-r border-[rgb(230, 230, 230)] min-h-screen w-20 relative hidden lg:block'>
						<nav className='h-full'>
							<div className='h-screen sticky top-0'>
								<div className='py-10 flex justify-center'>
									<Link href='/'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
											viewBox='0 0 24 24'
											className='cursor-pointer'
											fill='none'
											stroke='#2d2d2d'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'>
											<line x1='19' y1='12' x2='5' y2='12'></line>
											<polyline points='12 19 5 12 12 5'></polyline>
										</svg>
									</Link>
								</div>
							</div>
						</nav>
					</div>
					<main className='flex-1'>
						<div className='pb-20 border-b border-[rgb(230, 230, 230)]'>
							<div className='flex justify-center'>
								<div className='max-w-[692px] w-full min-w-0 mx-6 lg:mx-8'>
									<article>
										<header className='mt-14 mb-20'>
											<div className='flex items-center'>
												<Link href='/'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='24'
														height='24'
														viewBox='0 0 24 24'
														className='cursor-pointer mr-4 lg:hidden'
														fill='none'
														stroke='#2d2d2d'
														strokeWidth='2'
														strokeLinecap='round'
														strokeLinejoin='round'>
														<line x1='19' y1='12' x2='5' y2='12'></line>
														<polyline points='12 19 5 12 12 5'></polyline>
													</svg>
												</Link>
												<div className='h-12 w-12 mr-4 rounded-full overflow-hidden'>
													<img src={urlFor(post.author.image).url()!} alt='' />
												</div>
												<div>
													<div className='text-base font-semibold text-gray-900 mb-2'>
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
											<h1 className='text-4xl lg:text-6xl font-bold text-gray-900 mb-4'>
												{post.title}
											</h1>
											<h3 className='text-lg lg:text-xl font-medium text-gray-600 mb-8'>
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
																className='text-3xl lg:text-4xl font-bold tracking-wide mt-10 mb-5'
																{...props}
															/>
														),
														h2: (props: any) => (
															<h2
																className='text-2xl lg:text-3xl font-bold tracking-wide mt-10 mb-5'
																{...props}
															/>
														),
														h3: (props: any) => (
															<h3
																className='text-xl lg:text-2xl font-bold mt-10 mb-5'
																{...props}
															/>
														),
														h4: (props: any) => (
															<h4
																className='text-lg lg:text-xl font-bold mt-10 mb-5'
																{...props}
															/>
														),
														ul: ({ children }: any) => (
															<ul className='list-disc my-5 ml-10'>{children}</ul>
														),
														li: ({ children }: any) => (
															<li className='text-base font-medium text-gray-600 mb-2'>
																{children}
															</li>
														),
														link: ({ children }: any) => (
															<a className='text-base font-medium text-blue-600 underline underline-offset-1 cursor-pointer mb-2'>
																{children}
															</a>
														),
														blockquote: ({ children }: any) => (
															<blockquote className='text-xl lg:text-2xl text-center font-semibold text-gray-700 my-20 py-10 border-y border-gray-900/10'>
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
						<div className='py-10 mb-20 border-b border-[rgb(230, 230, 230)]'>
							<div className='flex justify-center'>
								<div className='max-w-[692px] w-full min-w-0 mx-6 lg:mx-8'>
									<h4 className='text-slate-500 mb-2'>Enjoyed this article?</h4>
									<h2 className='text-3xl font-bold text-gray-700 mb-4'>What are your thoughts?</h2>
									<div className='border-b border-[rgb(230, 230, 230)] mb-5'></div>
									<form id='commentForm'>
										<div className='flex flex-col gap-5'>
											<div className='border rounded-sm border-gray-300 p-2 group'>
												<label htmlFor='name' className='flex flex-col'>
													<span className='text-[13px] text-gray-500'>Tell us your Name</span>
													<input
														type='text'
														placeholder='Steve Jobs'
														id='name'
														name='name'
														className='text-base text-gray-900 font-medium outline-none focus:outline-none placeholder:text-gray-400 placeholder:font-normal'
													/>
												</label>
											</div>
											<div className='border rounded-sm border-gray-300 p-2 group'>
												<label htmlFor='email' className='flex flex-col'>
													<span className='text-[13px] text-gray-500'>
														What's your Email?
													</span>
													<input
														type='text'
														placeholder='stevejobs@apple.com'
														id='email'
														name='email'
														className='text-base text-gray-900 font-medium outline-none focus:outline-none placeholder:text-gray-400 placeholder:font-normal'
													/>
												</label>
											</div>
											<div className='border rounded-sm border-gray-300 p-2 group'>
												<label htmlFor='comment' className='flex flex-col'>
													<span className='text-[13px] text-gray-500'>
														Tell us your thoughts here!
													</span>
													<textarea
														placeholder='I love this article!'
														id='comment'
														name='comment'
														rows={4}
														className='text-base text-gray-900 font-medium outline-none focus:outline-none placeholder:text-gray-400 placeholder:font-normal resize-none'
													/>
												</label>
											</div>
											<button
												type='submit'
												className='self-end bg-slate-700 text-white font-medium px-8 py-2 rounded-sm hover:bg-slate-800 transition duration-200'>
												Respond
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</main>
					<div className='w-96 min-h-screen px-8 border-l border-[rgb(230, 230, 230)] hidden lg:block'>
						<div className='h-full w-full relative inline-block'>
							<div className='sticky top-0'>
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
										<div className='author-bio'>
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
