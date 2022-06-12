import Link from 'next/link';

function Header() {
	return (
		<header className='sticky top-0 w-full flex-none border-b border-stone-900 bg-slate-100 z-50'>
			<div className='max-w-[1192px] mx-auto'>
				<div className='py-4 border-b border-slate-900/10 lg:border-0 mx-6 lg:mx-4 xl:mx-0'>
					<div className='relative flex items-center'>
						<Link href='/'>
							<img
								className='w-44 object-contain cursor-pointer'
								src='https://links.papareact.com/yvf'
								alt=''
							/>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
